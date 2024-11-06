import { useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Inventory from './pages/Inventory';
import Purchase from './pages/Purchase';
import Report from './pages/Report';
import Sales from './pages/Sales';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  useEffect(() => {
    // Define the callback functions
    const handleMenuClick = () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('hide');
    };

    const handleSwitchModeChange = (event) => {
      document.body.classList.toggle('dark', event.target.checked);
    };

    // Add event listeners
    const menuBar = document.querySelector('.bx-menu');  // Fix selector for menu icon
    const switchMode = document.getElementById('switch-mode');

    if (menuBar) {
      menuBar.addEventListener('click', handleMenuClick);
    }

    if (switchMode) {
      switchMode.addEventListener('change', handleSwitchModeChange);
    }

    // Cleanup function to remove event listeners
    return () => {
      if (menuBar) {
        menuBar.removeEventListener('click', handleMenuClick);
      }
      if (switchMode) {
        switchMode.removeEventListener('change', handleSwitchModeChange);
      }
    };
  }, []);  // Empty dependency array means this effect will run only once 

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div id="content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
