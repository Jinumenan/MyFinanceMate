import Dashboard from "./Page/Dashboard";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import SignUp from './Page/Atuth/SignUp';
import './index.css';
import MyFinaceMateHome from "./Page/MyFinaceMateHome";
import Login from "./Page/Atuth/Login";
import UserProvider from "./context/UserContext";
import Income from "./Page/Income";
import Expense from "./Page/Expense";
import ViewTransaction from "./Page/ViewTransaction";
// import Income from "./Page/Income";


function App() {
  const user = localStorage.getItem('token');

  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<MyFinaceMateHome />} />
            <Route path="/income" exact element = {<Income/>} />
            <Route path="/expense" exact element = {<Expense/>} />
            <Route path="/viewtransaction" exact element = {<ViewTransaction/>} />
            <Route path="*" element={<Navigate replace to="/signin" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
