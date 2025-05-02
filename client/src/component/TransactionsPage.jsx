import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import TransactionItem from './TransactionItem';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import DateRangeModal from './Daterangemodal';
import FilterModal from './FilterModal';

const API_BASE_URL = 'http://localhost:3001';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [deletedTransaction, setDeletedTransaction] = useState(null);
  const [showUndoDelete, setShowUndoDelete] = useState(false);
  const undoTimerRef = useRef(null);
  const [categories, setCategories] = useState([
    'All Categories',
    'Income',
    'Expense'
  ]);

  const [filters, setFilters] = useState({
    category: 'All Categories',
    search: '',
    timeRange: 'Last 30 days',
    startDate: null,
    endDate: null,
    minAmount: null,
    maxAmount: null,
    sortField: 'date',
    sortOrder: 'desc',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      minAmount: newFilters.minAmount ?? prevFilters.minAmount,
      maxAmount: newFilters.maxAmount ?? prevFilters.maxAmount,
      type: newFilters.type || prevFilters.type,
      starred: Boolean(newFilters.starred),
      category: newFilters.category || prevFilters.category,
      search: newFilters.search ?? prevFilters.search,
      startDate: newFilters.startDate || prevFilters.startDate,
      endDate: newFilters.endDate || prevFilters.endDate
    }));
    setCurrentPage(1);
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '5',
        ...(filters.category !== 'All Categories' && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        ...(filters.minAmount && { minAmount: filters.minAmount }),
        ...(filters.maxAmount && { maxAmount: filters.maxAmount }),
        ...(filters.type && filters.type !== 'all' && { type: filters.type }),
        ...(filters.starred && { starred: 'true' }),
        sortField: filters.sortField,
        sortOrder: filters.sortOrder
      });

      const response = await fetch(`${API_BASE_URL}/api/transactions?${params}`);
      if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);

      const data = await response.json();

      if (data.success) {
        setTransactions(data.data.transactions || []);
        setTotalPages(data.data.totalPages || 1);
      } else {
        throw new Error(data.error || 'Failed fetching transactions');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories([
          'All Categories',
          'Income',
          'Expense',
          ...data.categories.slice(0, 5)
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [currentPage, filters]);

  const handleTimeRangeChange = (timeRange) => {
    let startDate = null;
    const today = new Date();

    switch (timeRange) {
      case 'Last 7 days':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case 'Last 30 days':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        break;
      case 'Last 90 days':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 90);
        break;
      case 'This month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'This year':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        break;
    }

    if (startDate) {
      handleFilterChange({
        timeRange,
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      });
    }
  };

  const handleSort = (sortOptions) => {
    setFilters(prev => ({
      ...prev,
      sortField: sortOptions.sortField,
      sortOrder: sortOptions.sortOrder
    }));
    setCurrentPage(1);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions(prev =>
      prev.map(t => t._id === updatedTransaction._id ? updatedTransaction : t)
    );
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm("Transaction will be permanently deleted. Are you sure?");
    if (!userConfirmed) return;

    const transactionToDelete = transactions.find(t => t._id === id);
    setTransactions(prev => prev.filter(t => t._id !== id));
    setDeletedTransaction(transactionToDelete);
    setShowUndoDelete(true);

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);

    undoTimerRef.current = setTimeout(async () => {
      try {
        await fetch(`${API_BASE_URL}/api/transactions/${id}`, { method: 'DELETE' });
        setShowUndoDelete(false);
      } catch (error) {
        setTransactions(prev => [...prev, transactionToDelete]);
        console.error('Error deleting transaction:', error);
      }
    }, 10000);
  };

  const handleUndoDelete = () => {
    if (deletedTransaction) {
      setTransactions(prev => [...prev, deletedTransaction]);
      setDeletedTransaction(null);
      setShowUndoDelete(false);
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    }
  };

  const handleOperation = async (operation, id) => {
    try {
      let endpoint;
      let method;

      switch (operation) {
        case 'star':
          endpoint = `${API_BASE_URL}/api/transactions/${id}/star`;
          method = 'PATCH';
          setTransactions(prev =>
            prev.map(t => t._id === id ? { ...t, starred: !t.starred } : t)
          );
          break;
        case 'delete':
          handleDelete(id);
          return;
        default:
          throw new Error('Unsupported operation');
      }

      const response = await fetch(endpoint, { method });
      if (!response.ok) {
        fetchTransactions();
        throw new Error(`Operation failed with status ${response.status}`);
      }
    } catch (error) {
      setError(error.message);
      fetchTransactions(); // revert changes
    }
  };

  return (
    <div className="transactions-page">
      {showUndoDelete && (
        <div className="undo-delete-notification">
          <span>Transaction deleted.</span>
          <button onClick={handleUndoDelete}>Undo</button>
        </div>
      )}

      <div className="transactions-header">
        <div className="header-left">
          <h1>Transactions History</h1>
          <p>View and manage your past transactions</p>
        </div>
        <div className="header-right">
          <Link to="/profile" className="user-profile" style={{ textDecoration: 'none' }}>
            <div className="avatar">HR</div>
            <div className="user-info">
              <h3>HarishRam</h3>
              <p>Personal Finance</p>
            </div>
          </Link>
        </div>
      </div>

      <FilterBar
        selectedCategory={filters.category}
        timeRange={filters.timeRange}
        searchQuery={filters.search}
        onOpenDateModal={() => setShowDateModal(true)}
        onOpenFilterModal={(filterData) => {
          handleFilterChange(filterData);
          setShowFilterModal(false);
        }}
        setSearchQuery={(search) => handleFilterChange({ search })}
        setSelectedCategory={(category) => handleFilterChange({ category })}
        setTimeRange={handleTimeRangeChange}
        setDateRange={(dateRange) => handleFilterChange(dateRange)}
        onSort={handleSort}
        transactions={transactions}
      />

      <div className="transactions-list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction._id}
              transaction={transaction}
              onStar={() => handleOperation('star', transaction._id)}
              onDelete={() => handleDelete(transaction._id)}
              onUpdateTransaction={handleUpdateTransaction}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showDateModal && (
        <DateRangeModal
          onClose={() => setShowDateModal(false)}
          onApplyDateRange={(dateRange) =>
            handleFilterChange({
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
              timeRange: 'Custom Range',
            })
          }
        />
      )}

      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={(filterData) => handleFilterChange(filterData)}
          currentFilters={filters}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
