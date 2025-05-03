import React, { useState } from 'react';
import Input from '../Inputs/input';
import EmojiPickerPopup from '../EmojiPickerPopup';
import { toast } from 'react-toastify';

export default function AddExpenseForm({ onAddExpense }) {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    if (key === 'amount') {
      const numericValue = value.replace(/[^0-9.]/g, '');
      const parts = numericValue.split('.');
      if (parts.length > 2) {
        const firstPart = parts[0];
        const secondPart = parts.slice(1).join('');
        setIncome({ ...income, [key]: `${firstPart}.${secondPart}` });
        return;
      }
      setIncome({ ...income, [key]: numericValue });
    } else if (key === 'category') {
      const textValue = value.replace(/[0-9]/g, '');
      setIncome({ ...income, [key]: textValue });
    } else {
      setIncome({ ...income, [key]: value });
    }
  };

  const validateForm = () => {
    if (!income.category.trim()) {
      toast.error("Please enter a category");
      return false;
    }

    if (!income.amount || isNaN(parseFloat(income.amount)) || parseFloat(income.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return false;
    }

    if (!income.date) {
      toast.error("Please select a date");
      return false;
    }

    if (!income.icon) {
      toast.error("Please select an icon");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onAddExpense({
        ...income,
        amount: parseFloat(income.amount)
      });

      toast.success("Expense added successfully!");

      // Reset form
      setIncome({
        category: "",
        amount: "",
        date: "",
        icon: ""
      });
    } catch (error) {
      toast.error(error.message || "Failed to add expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter numeric value only"
        type="text"
        inputMode="decimal"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Expense'}
        </button>
      </div>
    </div>
  );
}
