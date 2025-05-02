import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const FilterModal = ({ onClose, onApply, currentFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState(currentFilters?.categories || []);
  const [amountRange, setAmountRange] = useState({ 
    min: currentFilters?.minAmount || '', 
    max: currentFilters?.maxAmount || '' 
  });
  const [transactionType, setTransactionType] = useState(currentFilters?.type || 'all');
  const [showStarred, setShowStarred] = useState(currentFilters?.starred || false);
  
  const categories = [
    'Shopping', 'Groceries', 'Restaurant', 'Utilities', 
    'Transport', 'Healthcare', 'Entertainment', 'Income'
  ];
  
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const applyFilters = () => {
    // Create a filter object with the selected values
    const filterData = {
      categories: selectedCategories,
      minAmount: amountRange.min || null,
      maxAmount: amountRange.max || null,
      type: transactionType,
      starred: showStarred || transactionType === 'starred' // This is the key change
    };
    
    onApply(filterData);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Filter Transactions</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mt-2">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 block text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Amount Range</h4>
                <div className="flex space-x-4">
                  <div className="w-1/3">
                    <label htmlFor="min-amount" className="block text-xs text-gray-500">Min ($)</label>
                    <input
                      type="number"
                      id="min-amount"
                      value={amountRange.min}
                      onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="max-amount" className="block text-xs text-gray-500">Max ($)</label>
                    <input
                      type="number"
                      id="max-amount"
                      value={amountRange.max}
                      onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1000.00"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Transaction Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-all"
                      name="transaction-type"
                      value="all"
                      checked={transactionType === 'all'}
                      onChange={() => setTransactionType('all')}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="type-all" className="ml-2 block text-sm text-gray-700">
                      All Transactions
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-income"
                      name="transaction-type"
                      value="income"
                      checked={transactionType === 'income'}
                      onChange={() => setTransactionType('income')}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="type-income" className="ml-2 block text-sm text-gray-700">
                      Income Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-expense"
                      name="transaction-type"
                      value="expense"
                      checked={transactionType === 'expense'}
                      onChange={() => setTransactionType('expense')}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="type-expense" className="ml-2 block text-sm text-gray-700">
                      Expenses Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-starred"
                      name="transaction-type"
                      value="starred"
                      checked={transactionType === 'starred'}
                      onChange={() => setTransactionType('starred')}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="type-starred" className="ml-2 block text-sm text-gray-700">
                      Starred Only
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={applyFilters}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
