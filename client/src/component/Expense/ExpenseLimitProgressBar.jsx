import React from 'react';

const ExpenseLimitProgressBar = ({ currentAmount, limitAmount }) => {
  // Calculate percentage
  const percentage = Math.min((currentAmount / limitAmount) * 100, 100);
  
  // Determine color based on percentage
  let barColor = 'bg-green-500';
  if (percentage > 80 && percentage < 100) {
    barColor = 'bg-yellow-500';
  } else if (percentage >= 100) {
    barColor = 'bg-red-500';
  }
  
  return (
    <div className="card">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-lg">Monthly Expense Limit</h5>
          <div className="font-medium">
            ${currentAmount.toFixed(2)} / ${limitAmount}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`${barColor} h-2.5 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        
        {percentage >= 100 && (
          <div className="mt-2 text-sm text-red-500 font-medium">
            ⚠️ You have exceeded your monthly expense limit
          </div>
        )}
        {percentage > 80 && percentage < 100 && (
          <div className="mt-2 text-sm text-yellow-500 font-medium">
            ⚠️ You are approaching your monthly expense limit
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseLimitProgressBar;