import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('Dashboard'); // Default active link is Dashboard

  // Handle link click and set active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <section id="sidebar">
      {/* Brand section */}
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">AdminHub</span>
      </a>

      {/* Sidebar menu */}
      <ul className="side-menu top">
        {/* Dashboard Link */}
        <li className={activeLink === 'Dashboard' ? 'active' : ''}>
          <Link to="dashboard" onClick={() => handleLinkClick('Dashboard')}>
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>

        {/* Purchase Link */}
        <li className={activeLink === 'Purchase' ? 'active' : ''}>
          <Link to="/purchase" onClick={() => handleLinkClick('Purchase')}>
            <i className="bx bxs-cart"></i>
            <span className="text">Purchase</span>
          </Link>
        </li>

        {/* Inventory Link */}
        <li className={activeLink === 'Inventory' ? 'active' : ''}>
          <Link to="/inventory" onClick={() => handleLinkClick('Inventory')}>
            <i className="bx bxs-package"></i>
            <span className="text">Inventory</span>
          </Link>
        </li>

        {/* Sales Link */}
        <li className={activeLink === 'Sales' ? 'active' : ''}>
          <Link to="/sales" onClick={() => handleLinkClick('Sales')}>
            <i className="bx bxs-store"></i>
            <span className="text">Sales</span>
          </Link>
        </li>

        {/* Report Link */}
        <li className={activeLink === 'Report' ? 'active' : ''}>
          <Link to="/report" onClick={() => handleLinkClick('Report')}>
            <i className="bx bxs-file"></i>
            <span className="text">Report</span>
          </Link>
        </li>
      </ul>

      {/* Additional menu items */}
      <ul className="side-menu">
        {/* Settings Link */}
        <li>
          <Link to="/settings">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </Link>
        </li>

        {/* Account Link */}
        <li>
          <Link to="/account">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Account</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
