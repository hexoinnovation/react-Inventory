import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Inventory from './pages/Inventory';
import Purchase from './pages/Purchase';
import Suppliers from './pages/Suppliers';
import Report from './pages/Report';
import Sales from './pages/Sales';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [showModal, setShowModal] = useState(true); // Show/Hide modal for login
  const [sidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility state

  // Handle login logic
  const handleLogin = () => {
    setIsAuthenticated(true); // Set user as authenticated
    setShowModal(false); // Hide modal after login
  };

  // Handle logout logic
  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowModal(true); // Show modal after logout
  };

  // Handle sidebar toggle (when menu button is clicked)
  const handleMenuClick = () => {
    setSidebarVisible(prevState => !prevState); // Toggle sidebar visibility
  };

  useEffect(() => {
    // Any other setup logic can go here (e.g., checking authentication from localStorage)
  }, []); // Empty dependency array means this effect runs only once

  return (
    <Router>
      <div className="App">
        {/* Sidebar and Navbar only visible if user is authenticated */}
        {isAuthenticated && <Sidebar sidebarVisible={sidebarVisible} />}
        <div id="content" className={isAuthenticated ? "" : "blur-sm"}>
          {/* Navbar only visible if user is authenticated */}
          {isAuthenticated && <Navbar handleMenuClick={handleMenuClick} />}

          {/* Routes */}
          <Routes>
            <Route path="/" element={!isAuthenticated ? "" : <Dashboard handleLogin={handleLogin} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/purchase" element={isAuthenticated ? <Purchase /> : <Navigate to="/" />} />
            <Route path="/suppliers" element={isAuthenticated ? <Suppliers  /> : <Navigate to="/" />} />
            <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/" />} />
            <Route path="/sales" element={isAuthenticated ? <Sales /> : <Navigate to="/" />} />
            <Route path="/report" element={isAuthenticated ? <Report /> : <Navigate to="/" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
            <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
          </Routes>
        </div>

        {/* Modal for Login/Signup */}
        {!isAuthenticated && showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg w-96">
              <h2 className="text-2xl mb-4">Login</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <input type="text" placeholder="Username" className="mb-4 p-2 w-full border border-gray-300 rounded" />
                <input type="password" placeholder="Password" className="mb-4 p-2 w-full border border-gray-300 rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  Login
                </button>
              </form>
              <p className="text-sm mt-4">
                Don't have an account? <button className="text-blue-500">Sign Up</button>
              </p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
