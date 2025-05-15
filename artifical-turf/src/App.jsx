import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './data/UserContext';
import AppRoutes from './AppRoutes'; 

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
