import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { FaFilter, FaCalendarAlt, FaSort, FaSearch } from 'react-icons/fa';

const FilterBar = ({ 
  setDateRange, 
  setSelectedCategory, 
  setTimeRange, 
  selectedCategory, 
  timeRange,
  setSearchQuery,
  searchQuery,
  onOpenDateModal,
  onOpenFilterModal,
  onSort
}) => {
  // State for dropdown visibility
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Date range state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Filter state
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [transactionType, setTransactionType] = useState('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  
  // Available categories for dropdown
  const categories = [
    'All Categories',
    'Income',
    'Expense',
    'Shopping',
    'Dining',
    'Transportation',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Education'
  ];

  // Available time ranges for dropdown
  const timeRanges = [
    'Last 7 days',
    'Last 30 days',
    'Last 90 days',
    'This month',
    'This year',
    'Custom range'
  ];
  
  // Sort options
  const sortOptions = [
    'Date (newest first)',
    'Date (oldest first)',
    'Amount (highest first)',
    'Amount (lowest first)',
    'Alphabetical (A-Z)',
    'Alphabetical (Z-A)'
  ];
  
  // Add ref for click outside handling
  const filterBarRef = useRef(null);
  
  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterBarRef.current && !filterBarRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    setShowFilterDropdown(false);
    setShowDateDropdown(false);
    setShowSortDropdown(false);
  };

  // Handle button clicks
  const handleButtonClick = (dropdownType) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    switch(dropdownType) {
      case 'filter':
        setShowFilterDropdown(!showFilterDropdown);
        setShowDateDropdown(false);
        setShowSortDropdown(false);
        break;
      case 'date':
        setShowDateDropdown(!showDateDropdown);
        setShowFilterDropdown(false);
        setShowSortDropdown(false);
        break;
      case 'sort':
        setShowSortDropdown(!showSortDropdown);
        setShowFilterDropdown(false);
        setShowDateDropdown(false);
        break;
      default:
        break;
    }
  };

  // Prevent dropdown click from bubbling
  const handleDropdownClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // Apply filters
  const applyFilters = () => {
    // Validate amount range
    const min = parseFloat(amountRange.min);
    const max = parseFloat(amountRange.max);
    
    if (min && max && min > max) {
      alert('Minimum amount cannot be greater than maximum amount');
      return;
    }

    const filterData = {
      minAmount: !isNaN(min) ? min : null,
      maxAmount: !isNaN(max) ? max : null,
      type: transactionType !== 'all' ? transactionType : null,
      starred: showStarredOnly
    };
    
    if (onOpenFilterModal) {
      onOpenFilterModal(filterData);
    }
    setShowFilterDropdown(false);
  };

  // Apply custom date range
  const applyCustomDateRange = () => {
    if (startDate && endDate) {
      setDateRange({ startDate, endDate });
      setShowDateDropdown(false);
    }
  };
  
  // Apply sort
  const applySort = (sortOption) => {
    let sortParams = {
      sortField: 'date',
      sortOrder: 'desc'
    };
    
    switch(sortOption) {
      case 'Date (newest first)':
        sortParams = { sortField: 'date', sortOrder: 'desc' };
        break;
      case 'Date (oldest first)':
        sortParams = { sortField: 'date', sortOrder: 'asc' };
        break;
      case 'Amount (highest first)':
        sortParams = { sortField: 'amount', sortOrder: 'desc' };
        break;
      case 'Amount (lowest first)':
        sortParams = { sortField: 'amount', sortOrder: 'asc' };
        break;
      case 'Alphabetical (A-Z)':
        sortParams = { sortField: 'title', sortOrder: 'asc' };
        break;
      case 'Alphabetical (Z-A)':
        sortParams = { sortField: 'title', sortOrder: 'desc' };
        break;
      default:
        break;
    }
    
    if (onSort) {
      onSort(sortParams);
      setShowSortDropdown(false);
    }
  };

  // Add this function inside the FilterBar component
  const getDropdownPosition = (buttonRef) => {
    if (!buttonRef.current) return {};
    
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left}px`,
      position: 'fixed',
      zIndex: 1000
    };
  };

  // Add refs for each dropdown button
  const filterButtonRef = useRef(null);
  const dateButtonRef = useRef(null);
  const sortButtonRef = useRef(null);

  return (
    <div className="filter-bar" ref={filterBarRef}>
      <div className="filter-options">
        {/* Filter Button */}
        <div className="filter-option position-relative">
          <button 
            ref={filterButtonRef}
            className="filter-button"
            onClick={handleButtonClick('filter')}
          >
            <FaFilter /> Filter
          </button>
          
          {showFilterDropdown && (
            <div 
              className="filter-dropdown" 
              onClick={handleDropdownClick}
              style={getDropdownPosition(filterButtonRef)}
            >
              <div className="dropdown-section">
                <h4>Amount Range</h4>
                <div className="amount-inputs">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={amountRange.min}
                    onChange={(e) => setAmountRange({...amountRange, min: e.target.value})}
                    style={{ maxWidth: "100px" }}
                  />
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={amountRange.max}
                    onChange={(e) => setAmountRange({...amountRange, max: e.target.value})}
                    style={{ maxWidth: "100px" }}
                  />
                </div>
              </div>
              
              <div className="dropdown-section">
                <h4>Transaction Type</h4>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="transactionType" 
                      value="all" 
                      checked={transactionType === 'all'}
                      onChange={() => setTransactionType('all')}
                    /> All
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="transactionType" 
                      value="income" 
                      checked={transactionType === 'income'}
                      onChange={() => setTransactionType('income')}
                    /> Income
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="transactionType" 
                      value="expense" 
                      checked={transactionType === 'expense'}
                      onChange={() => setTransactionType('expense')}
                    /> Expense
                  </label>
                </div>
              </div>
              
              <div className="dropdown-section">
                <h4>Starred Transactions</h4>
                <label>
                  <input 
                    type="checkbox" 
                    checked={showStarredOnly}
                    onChange={() => setShowStarredOnly(!showStarredOnly)}
                  /> Show starred only
                </label>
              </div>
              
              <div className="dropdown-actions">
                <button onClick={() => setShowFilterDropdown(false)}>Cancel</button>
                <button onClick={applyFilters} className="apply-btn">Apply Filters</button>
              </div>
            </div>
          )}
        </div>

        {/* Date Range Button */}
        <div className="filter-option position-relative">
          <button 
            ref={dateButtonRef}
            className="filter-button"
            onClick={handleButtonClick('date')}
          >
            <FaCalendarAlt /> Date Range
          </button>
          
          {showDateDropdown && (
            <div 
              className="filter-dropdown" 
              onClick={handleDropdownClick}
              style={getDropdownPosition(dateButtonRef)}
            >
              <div className="dropdown-section">
                <h4>Select Date Range</h4>
                <div className="date-inputs">
                  <div style={{ maxWidth: "120px" }}>
                    <label>Start Date</label>
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ maxWidth: "120px" }}
                    />
                  </div>
                  <div style={{ maxWidth: "120px" }}>
                    <label>End Date</label>
                    <input 
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ maxWidth: "120px" }}
                    />
                  </div>
                </div>
                <button 
                  className="apply-date-btn"
                  onClick={applyCustomDateRange}
                >
                  Apply Date Range
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sort Button */}
        <div className="filter-option position-relative">
          <button 
            ref={sortButtonRef}
            className="filter-button"
            onClick={handleButtonClick('sort')}
          >
            <FaSort /> Sort
          </button>
          
          {showSortDropdown && (
            <div 
              className="filter-dropdown" 
              onClick={handleDropdownClick}
              style={getDropdownPosition(sortButtonRef)}
            >
              <div className="dropdown-section">
                <h4>Sort By</h4>
                <div className="sort-options">
                  {sortOptions.map(option => (
                    <button 
                      key={option} 
                      className="sort-option-btn"
                      onClick={() => applySort(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="filter-option category-dropdown">
          <select 
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              if (typeof onCategoryChange === 'function') {
                onCategoryChange(e.target.value);
              }
            }}
            className="form-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-option time-dropdown">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {timeRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search transactions..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterBar;
