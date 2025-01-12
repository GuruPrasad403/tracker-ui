import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Signup } from './components/Signup';
import Login from './components/Login';
import VerifyOtp from './components/VerifyOtp';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute ';
import Dashboard from './components/Dashborad';
import Layout from './pages/Layout';
import Account from './components/Accounts';
import Expenses from './components/Expenses';
function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<VerifyOtp />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/add-expenses" element={<Expenses />} />
          <Route path="/expenses" element={<div className='text-white'>Hi this is the expenses</div>} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
