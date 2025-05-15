import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './ui/auth/LoginPage';
import RegisterPage from './ui/auth/RegisterPage';
import MainPage from './ui/mainflow/MainPage';
import AdminPage from './ui/admin/AdminPage';
import { useUser } from './data/UserContext';
import CartPage from './ui/mainflow/CartPage';
import PastReservations from './ui/mainflow/PastReservations';

function AppRoutes() {
  const { currentUser } = useUser();

  if (!currentUser) {
    
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }



  
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/pastreservations" element={<PastReservations />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default AppRoutes;
