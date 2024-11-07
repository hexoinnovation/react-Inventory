import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Inventory from './pages/Inventory';
import Purchase from './pages/Purchase';
import Report from './pages/Report';
import Sales from './pages/Sales';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';

import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa'; // Importing icons
import Suppliers from './pages/Suppliers';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [showModal, setShowModal] = useState(true); // Show/Hide modal for login
  const [sidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility state
  const [isSignup, setIsSignup] = useState(false);

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
            <Route path="/suppliers" element={isAuthenticated ? <Suppliers/> : <Navigate to="/" />} />
            <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/" />} />
            <Route path="/sales" element={isAuthenticated ? <Sales /> : <Navigate to="/" />} />
            <Route path="/report" element={isAuthenticated ? <Report /> : <Navigate to="/" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
            <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
          </Routes>
        </div>

        {/* Modal for Login/Signup */}
        {!isAuthenticated &&  showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-10 rounded-lg w-96 shadow-lg transform transition-all duration-300 scale-100 hover:scale-105">
          <h2 className="text-3xl mb-6 text-center text-gray-800">{isSignup ? 'Sign Up' : 'Login'}</h2>
          
          {/* Login or Signup Form */}
          <form onSubmit={(e) => { e.preventDefault(); isSignup ? handleSignup() : handleLogin(); }}>
            {/* Username or Email Field */}
            <div className="mb-6">
              <div className="relative">
                <div className="flex items-center absolute left-3 top-2 text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  placeholder={isSignup ? 'Username' : 'Email'}
                  className="w-full p-3 pl-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <div className="relative">
                <div className="flex items-center absolute left-3 top-2 text-gray-400">
                  <FaLock />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 pl-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white p-3 rounded-lg hover:from-blue-400 hover:to-teal-500 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaSignInAlt />
              <span>{isSignup ? 'Sign Up' : 'Login'}</span>
            </button>
          </form>

          {/* Switch to Sign Up / Login */}
          <p className="text-sm mt-4 text-center text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-blue-500 hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
        )}
        </div>
    </Router>
  );
};

export default App;
