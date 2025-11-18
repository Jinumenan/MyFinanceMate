import React from 'react';

export default function Service () {
  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">💼 Your Guide to Smart Financial Services</h1>
      <p className="mb-6">Credit Card Rewards & High-Interest Savings Accounts</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">💳 Credit Card Rewards: Spend Smarter, Earn More</h2>
        <p className="mb-4">
          Credit card rewards can be one of the easiest ways to get extra value out of your daily purchases —
          but only if you understand how they work and use them responsibly.
        </p>

        <h3 className="text-xl font-semibold mb-2">🔸 What Are Credit Card Rewards?</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Cashback – Earn a percentage of your spending back (e.g., 1%–5%)</li>
          <li>Reward Points – Redeem points for gifts, merchandise, or travel</li>
          <li>Travel Miles – Collect miles for flights, hotels, or upgrades</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">🔸 How to Maximize Rewards</h3>
        <ol className="list-decimal list-inside mb-4">
          <li>Pick the right card for your spending habits</li>
          <li>Pay full balance each month to avoid interest</li>
          <li>Redeem your rewards before they expire</li>
          <li>Don’t overspend just to earn rewards</li>
        </ol>

        <p className="mb-4 font-medium">💡 Pro Tip: Many cards offer sign-up bonuses like "10,000 bonus points". Use wisely!</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🏦 High-Interest Savings Accounts: Safe & Steady Growth</h2>
        <p className="mb-4">
          A high-interest savings account helps your money grow over time with no investment risk.
        </p>

        <h3 className="text-xl font-semibold mb-2">🔸 What Is It?</h3>
        <p className="mb-4">These accounts offer above-average interest, making them ideal for passive income and safety.</p>

        <h3 className="text-xl font-semibold mb-2">🔸 Key Benefits</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Higher earnings than regular accounts</li>
          <li>Safe and insured (based on your bank)</li>
          <li>Flexible access to your funds</li>
          <li>Perfect for emergency savings</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">🔸 How to Choose the Right Account</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Compare interest rates</li>
          <li>Check minimum balance requirements</li>
          <li>Watch for fees</li>
          <li>Prefer compound interest for faster growth</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🔐 Bonus Tip: Combine & Conquer</h2>
        <p className="mb-4">
          Use a rewards credit card for spending, pay it off using your savings, and funnel your cashback into your savings again.
          It’s like earning to save!
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">📞 Need Help?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Free credit card recommendations</li>
          <li>Compare high-interest savings options</li>
          <li>Step-by-step setup support</li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-xl font-semibold mb-4">🚀 Start Building Your Financial Future Today</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl">Apply for a Credit Card</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-xl">Open a Savings Account</button>
          <button className="bg-gray-700 text-white px-6 py-2 rounded-xl">Talk to an Advisor</button>
        </div>
      </section>
    </div>
  );
};


