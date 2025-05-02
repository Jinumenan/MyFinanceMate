import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { FaFilter, FaCalendarAlt, FaSort, FaSearch, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  onSort,
  transactions
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [transactionType, setTransactionType] = useState('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const categories = [
    'All Categories', 'Income', 'Expense', 'Shopping', 'Dining',
    'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Education'
  ];

  const timeRanges = [
    'Last 7 days', 'Last 30 days', 'Last 90 days', 'This month', 'This year', 'Custom range'
  ];

  const sortOptions = [
    'Date (newest first)', 'Date (oldest first)',
    'Amount (highest first)', 'Amount (lowest first)',
    'Alphabetical (A-Z)', 'Alphabetical (Z-A)'
  ];

  const filterBarRef = useRef(null);
  const filterButtonRef = useRef(null);
  const dateButtonRef = useRef(null);
  const sortButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterBarRef.current && !filterBarRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllDropdowns = () => {
    setShowFilterDropdown(false);
    setShowDateDropdown(false);
    setShowSortDropdown(false);
  };

  const handleButtonClick = (type) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowFilterDropdown(type === 'filter' ? !showFilterDropdown : false);
    setShowDateDropdown(type === 'date' ? !showDateDropdown : false);
    setShowSortDropdown(type === 'sort' ? !showSortDropdown : false);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const applyFilters = () => {
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
    if (onOpenFilterModal) onOpenFilterModal(filterData);
    setShowFilterDropdown(false);
  };

  const applyCustomDateRange = () => {
    if (startDate && endDate) {
      setDateRange({ startDate, endDate });
      setShowDateDropdown(false);
    }
  };

  const applySort = (option) => {
    const sortMap = {
      'Date (newest first)': { sortField: 'date', sortOrder: 'desc' },
      'Date (oldest first)': { sortField: 'date', sortOrder: 'asc' },
      'Amount (highest first)': { sortField: 'amount', sortOrder: 'desc' },
      'Amount (lowest first)': { sortField: 'amount', sortOrder: 'asc' },
      'Alphabetical (A-Z)': { sortField: 'title', sortOrder: 'asc' },
      'Alphabetical (Z-A)': { sortField: 'title', sortOrder: 'desc' }
    };
    if (onSort) onSort(sortMap[option]);
    setShowSortDropdown(false);
  };

  const getDropdownPosition = (ref) => {
    if (!ref.current) return {};
    const rect = ref.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left}px`,
      position: 'fixed',
      zIndex: 1000
    };
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.setTextColor(66, 133, 244);
      doc.text('Transactions Report', 14, 15);
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

      const tableData = transactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.title,
        t.category,
        t.amount < 0 ? `-$${Math.abs(t.amount).toFixed(2)}` : `$${t.amount.toFixed(2)}`,
        t.note || ''
      ]);

      const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

      doc.autoTable({
        head: [['Date', 'Description', 'Category', 'Amount', 'Note']],
        body: tableData,
        startY: 35,
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [66, 133, 244], textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 247] },
        columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 50 }, 2: { cellWidth: 35 }, 3: { cellWidth: 30 }, 4: { cellWidth: 'auto' } }
      });

      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(10);
      doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 14, finalY);
      doc.text(`Total Expenses: $${totalExpense.toFixed(2)}`, 14, finalY + 7);
      doc.text(`Net Balance: $${(totalIncome - totalExpense).toFixed(2)}`, 14, finalY + 14);

      doc.save(`transactions-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Failed to generate PDF.');
    }
  };

  return (
    <div className="filter-bar" ref={filterBarRef}>
      <div className="filter-options">
        <button className="filter-button pdf-button" onClick={generatePDF} title="Export to PDF">
          <FaFilePdf /> Export PDF
        </button>

        <div className="filter-option">
          <button ref={filterButtonRef} className="filter-button" onClick={handleButtonClick('filter')}>
            <FaFilter /> Filter
          </button>
          {showFilterDropdown && (
            <div className="filter-dropdown" onClick={handleDropdownClick} style={getDropdownPosition(filterButtonRef)}>
              <div className="dropdown-section">
                <h4>Amount Range</h4>
                <input type="number" placeholder="Min" value={amountRange.min} onChange={e => setAmountRange({ ...amountRange, min: e.target.value })} />
                <input type="number" placeholder="Max" value={amountRange.max} onChange={e => setAmountRange({ ...amountRange, max: e.target.value })} />
              </div>
              <div className="dropdown-section">
                <h4>Transaction Type</h4>
                {['all', 'income', 'expense'].map(type => (
                  <label key={type}><input type="radio" value={type} checked={transactionType === type} onChange={() => setTransactionType(type)} /> {type}</label>
                ))}
              </div>
              <div className="dropdown-section">
                <h4>Starred Only</h4>
                <label><input type="checkbox" checked={showStarredOnly} onChange={() => setShowStarredOnly(!showStarredOnly)} /> Show starred only</label>
              </div>
              <div className="dropdown-actions">
                <button onClick={() => setShowFilterDropdown(false)}>Cancel</button>
                <button onClick={applyFilters}>Apply Filters</button>
              </div>
            </div>
          )}
        </div>

        <div className="filter-option">
          <button ref={dateButtonRef} className="filter-button" onClick={handleButtonClick('date')}>
            <FaCalendarAlt /> Date Range
          </button>
          {showDateDropdown && (
            <div className="filter-dropdown" onClick={handleDropdownClick} style={getDropdownPosition(dateButtonRef)}>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              <button onClick={applyCustomDateRange}>Apply Date Range</button>
            </div>
          )}
        </div>

        <div className="filter-option">
          <button ref={sortButtonRef} className="filter-button" onClick={handleButtonClick('sort')}>
            <FaSort /> Sort
          </button>
          {showSortDropdown && (
            <div className="filter-dropdown" onClick={handleDropdownClick} style={getDropdownPosition(sortButtonRef)}>
              {sortOptions.map(option => (
                <button key={option} onClick={() => applySort(option)}>{option}</button>
              ))}
            </div>
          )}
        </div>

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          {timeRanges.map(range => <option key={range} value={range}>{range}</option>)}
        </select>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
    </div>
  );
};

export default FilterBar;