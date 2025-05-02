import React, { useState, useEffect } from 'react';
import { FiStar, FiEdit, FiTrash } from 'react-icons/fi';
import SearchBar from './Searchbar';
import Pagination from './Pagination';
import FilterModal from './FilterModal';
import DateRangeModal from './Daterangemodal';
import "../App.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);

  // Simulate fetching transactions from API
  useEffect(() => {
    const fetchTransactions = () => {
      // Simulated data fetch
      const data = [
        { id: 1, description: 'Shopping', amount: 100, category: 'Shopping', date: '2025-03-10', isFavorite: false },
        { id: 2, description: 'Groceries', amount: 50, category: 'Groceries', date: '2025-03-09', isFavorite: false },
        { id: 3, description: 'Restaurant', amount: 30, category: 'Restaurant', date: '2025-03-08', isFavorite: true },
        // More transactions
      ];
      setTransactions(data);
      setFilteredTransactions(data);
      setTotalPages(Math.ceil(data.length / 5)); // Example: 5 items per page
    };
    fetchTransactions();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredTransactions(
      transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Open filter modal
  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  // Close filter modal
  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  // Open date range modal
  const openDateRangeModal = () => {
    setIsDateRangeModalOpen(true);
  };

  // Close date range modal
  const closeDateRangeModal = () => {
    setIsDateRangeModalOpen(false);
  };

  // Handle transaction actions (e.g., star, edit, delete)
  const handleAction = (action, id) => {
    const updatedTransactions = [...filteredTransactions];
    const transactionIndex = updatedTransactions.findIndex(t => t.id === id);
    if (action === 'favorite') {
      updatedTransactions[transactionIndex].isFavorite = !updatedTransactions[transactionIndex].isFavorite;
    }
    if (action === 'delete') {
      updatedTransactions.splice(transactionIndex, 1);
    }
    setFilteredTransactions(updatedTransactions);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
        <div className="flex space-x-2">
          <button onClick={openFilterModal} className="btn btn-primary">Filter</button>
          <button onClick={openDateRangeModal} className="btn btn-secondary">Date Range</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.slice((currentPage - 1) * 5, currentPage * 5).map(transaction => (
              <tr key={transaction.id}>
                <td className="px-6 py-2 text-sm text-gray-900">{transaction.description}</td>
                <td className="px-6 py-2 text-sm text-gray-900">{transaction.amount}</td>
                <td className="px-6 py-2 text-sm text-gray-900">{transaction.category}</td>
                <td className="px-6 py-2 text-sm text-gray-900">{transaction.date}</td>
                <td className="px-6 py-2 text-sm text-gray-900">
                  <button
                    onClick={() => handleAction('favorite', transaction.id)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    {transaction.isFavorite ? <FiStar /> : <FiStar className="text-gray-400" />}
                  </button>
                  <button
                    onClick={() => handleAction('edit', transaction.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleAction('delete', transaction.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Filter Modal */}
      {isFilterModalOpen && <FilterModal onClose={closeFilterModal} />}
      
      {/* Date Range Modal */}
      {isDateRangeModalOpen && <DateRangeModal onClose={closeDateRangeModal} />}
    </div>
  );
};

export default TransactionList;