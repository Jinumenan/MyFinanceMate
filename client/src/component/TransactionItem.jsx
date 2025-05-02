import React, { useState } from 'react';
import '../App.css';
import { FaStar, FaRegStar, FaPencilAlt, FaTrash, FaCopy, FaSitemap } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

const TransactionItem = ({ transaction, onStar, onEdit, onDelete, onSplit, onAddNote, onUpdateTransaction }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showSplitForm, setShowSplitForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteText, setNoteText] = useState(transaction.note);
  const [splitItems, setSplitItems] = useState(transaction.splitTransactions || []);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [editingSplitItem, setEditingSplitItem] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [editedAmount, setEditedAmount] = useState('');

  // Format amount with commas and 2 decimal places
  const formatAmount = (amount) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Format date properly
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get icon based on transaction category
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'shopping':
        return <div className="icon shopping">🛒</div>;
      case 'dining':
        return <div className="icon dining">🍽️</div>;
      case 'income':
        return <div className="icon income">💰</div>;
      default:
        return <div className="icon other">📊</div>;
    }
  };

  // Add new split item
  const addSplitItem = async () => {
    if (!newCategory || !newAmount) return;
    
    const newItem = {
      category: newCategory,
      amount: parseFloat(newAmount)
    };
    
    const updatedSplitItems = [...splitItems, newItem];
    setSplitItems(updatedSplitItems);
    setNewCategory('');
    setNewAmount('');
    
    try {
      const response = await fetch(`http://localhost:3001/api/transactions/${transaction._id}/split`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ splitTransactions: updatedSplitItems }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to split transaction');
      }
      
      const updatedTransaction = await response.json();
      if (onUpdateTransaction) {
        onUpdateTransaction(updatedTransaction);
      }
    } catch (error) {
      console.error('Error splitting transaction:', error);
    }
  };

  // Save note
  const saveNote = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/transactions/${transaction._id}/note`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: noteText }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      
      const updatedTransaction = await response.json();
      if (onUpdateTransaction) {
        onUpdateTransaction(updatedTransaction);
      }
      setShowNoteForm(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Handle star without page refresh
  const handleStar = async () => {
    // Optimistically update UI
    const updatedTransaction = { ...transaction, starred: !transaction.starred };
    if (onUpdateTransaction) {
      onUpdateTransaction(updatedTransaction);
    }

    try {
      // Send request to server
      await fetch(`http://localhost:3001/api/transactions/${transaction._id}/star`, {
        method: 'PATCH'
      });
    } catch (error) {
      console.error('Error starring transaction:', error);
      // Revert UI if request fails
      if (onUpdateTransaction) {
        onUpdateTransaction(transaction);
      }
    }
  };

  // Copy transaction details to clipboard
  const copyTransactionDetails = () => {
    const formattedDate = formatDate(transaction.date);
    const details = `${transaction.title} - ${formatAmount(Math.abs(transaction.amount))} - ${formattedDate}`;
    navigator.clipboard.writeText(details);
    alert("Transaction details copied to clipboard!");
  };

  // Handle split item edit
  const handleEditSplitItem = (item, index) => {
    setEditingSplitItem(index);
    setEditedCategory(item.category);
    setEditedAmount(item.amount.toString());
  };

  // Save split item changes
  const saveSplitItemChanges = async (index) => {
    try {
      const updatedSplitItems = [...splitItems];
      updatedSplitItems[index] = {
        category: editedCategory,
        amount: parseFloat(editedAmount)
      };

      const response = await fetch(`http://localhost:3001/api/transactions/${transaction._id}/split`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ splitTransactions: updatedSplitItems }),
      });

      if (!response.ok) throw new Error('Failed to update split item');

      setSplitItems(updatedSplitItems);
      setEditingSplitItem(null);
    } catch (error) {
      console.error('Error updating split item:', error);
    }
  };

  // Delete split item
  const deleteSplitItem = async (index) => {
    try {
      const updatedSplitItems = splitItems.filter((_, i) => i !== index);
      
      const response = await fetch(`http://localhost:3001/api/transactions/${transaction._id}/split`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ splitTransactions: updatedSplitItems }),
      });

      if (!response.ok) throw new Error('Failed to delete split item');

      setSplitItems(updatedSplitItems);
    } catch (error) {
      console.error('Error deleting split item:', error);
    }
  };

  return (
    <div className="transaction-item">
      <div className="transaction-main">
        <div className="transaction-left">
          {getCategoryIcon(transaction.category)}
          <div className="transaction-details">
            <div className="transaction-title">{transaction.title}</div>
            <div className="transaction-date">{formatDate(transaction.date)} • {transaction.time}</div>
            {transaction.note && <div className="transaction-note">{transaction.note}</div>}
          </div>
        </div>
        <div className="transaction-right">
          <div className={`transaction-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
            {transaction.amount < 0 ? '-' : '+'}${formatAmount(Math.abs(transaction.amount))}
          </div>
          <div className="transaction-actions">
            <button 
              className="action-btn star" 
              onClick={handleStar}
              style={{ color: transaction.starred ? '#ffc107' : '#aaa' }}
            >
              {transaction.starred ? <FaStar /> : <FaRegStar />}
            </button>
            <button className="action-btn" onClick={() => setShowNoteForm(true)} style={{ color: '#007bff' }}>
              <FaPencilAlt />
            </button>
            <button className="action-btn" onClick={copyTransactionDetails} style={{ color: '#28a745' }}>
              <FaCopy />
            </button>
            <button className="action-btn" onClick={() => onDelete(transaction._id)} style={{ color: '#dc3545' }}>
              <FaTrash />
            </button>
            <button className="action-btn" onClick={() => setShowSplitForm(!showSplitForm)} style={{ color: '#6c757d' }}>
              <FaSitemap />
            </button>
          </div>
        </div>
      </div>

      {/* Note Form */}
      {showNoteForm && (
        <div className="note-form">
          <textarea 
            value={noteText} 
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note to this transaction..."
          />
          <div className="form-actions">
            <button onClick={() => setShowNoteForm(false)}>Cancel</button>
            <button onClick={saveNote}>Save</button>
          </div>
        </div>
      )}

      {/* Split transactions */}
      {transaction.split && (
        <div className="split-transactions">
          <div className="split-header">Split transactions:</div>
          {splitItems.map((item, index) => (
            <div key={index} className="split-item">
              {editingSplitItem === index ? (
                <div className="split-item-edit">
                  <input
                    type="text"
                    value={editedCategory}
                    onChange={(e) => setEditedCategory(e.target.value)}
                    className="edit-input"
                  />
                  <input
                    type="number"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                    className="edit-input"
                  />
                  <div className="split-item-actions">
                    <button onClick={() => saveSplitItemChanges(index)} className="save-btn">Save</button>
                    <button onClick={() => setEditingSplitItem(null)} className="cancel-btn">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="split-category">{item.category}</div>
                  <div className="split-amount">
                    ${formatAmount(item.amount)}
                    <div className="split-item-actions">
                      <button onClick={() => handleEditSplitItem(item, index)} className="edit-btn">
                        <FaPencilAlt />
                      </button>
                      <button onClick={() => deleteSplitItem(index)} className="delete-btn">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Split form */}
      {showSplitForm && (
        <div className="split-form">
          <h4>Add Split Transaction</h4>
          <div className="split-form-fields">
            <input 
              type="text" 
              placeholder="Category" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Amount" 
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <button onClick={addSplitItem}>Add</button>
          </div>
          <div className="form-actions">
            <button onClick={() => setShowSplitForm(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
