import Dashboard from "./component/Dashboard"
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
