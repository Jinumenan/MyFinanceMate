import Dashboard from "./component/Dashboard";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './component/demo authentication/Signin';
import SignUp from './component/demo authentication/SignUp';
import Main from './component/demo authentication/Main';
import './index.css';
import MyFinaceMateHome from "./MYfinacemate_home/component/MyFinaceMateHome";


function App() {
  const user = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<MyFinaceMateHome />} />
        <Route path="*" element={<Navigate replace to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
