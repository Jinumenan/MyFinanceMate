import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsPage from './component/TransactionsPage';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
import ProfilePage from './component/ProfilePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/income" element={<IncomePage />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<TransactionsPage />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
