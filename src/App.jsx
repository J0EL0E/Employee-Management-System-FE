import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import Homepage from './components/Homepage';
import { EmployeeContextProvider } from './context/EmployeeContext';
import AddNewEmployee from './pages/AddNewEmployee';
import UpdateEmployee from './pages/UpdateEmployee';

function App() {

  return (
    <EmployeeContextProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/employee/create' element={<AddNewEmployee />} />
          <Route path='/employee/update/:id' element={<UpdateEmployee />} />
          <Route path='/' element={<Homepage />} />
        </Routes>
      </Router>
    </EmployeeContextProvider>
    
  )
}

export default App
