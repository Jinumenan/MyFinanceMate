import React, { useState, useEffect } from 'react'
import Input from '../Inputs/input';
import EmojiPickerPopup from '../EmojiPickerPopup';

export default function AddIncomeform({ onAddIncome, initialData, isEditing }) {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    // Initialize form with existing data when editing
    useEffect(() => {
        console.log("AddIncomeform useEffect triggered");
        console.log("isEditing:", isEditing);
        console.log("initialData:", initialData);
        
        if (isEditing && initialData) {
            console.log("Setting form with edit data");
            setIncome({
                source: initialData.source || "",
                amount: initialData.amount || "",
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
                icon: initialData.icon || "",
            });
        } else {
            // Reset form when not editing
            console.log("Resetting form data");
            setIncome({
                source: "",
                amount: "",
                date: "",
                icon: "",
            });
        }
    }, [initialData, isEditing]);

    const handleChange = (key, value) => setIncome({
        ...income, [key]: value
    })
    
    const handleSubmit = () => {
        console.log("Submit button clicked");
        console.log("Form data:", income);
        console.log("isEditing:", isEditing);
        onAddIncome(income);
    }

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            
            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                Placeholder="freelance, salary, etc"
                type="text"
            />

            <Input 
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                Placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                Placeholder=""
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                    type="button"
                    className='add-btn add-btn-fill'
                    onClick={handleSubmit}
                >
                    {isEditing ? "Update Income" : "Add Income"}
                </button>
            </div>
        </div>
    )
}
