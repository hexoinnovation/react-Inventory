import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarVisible }) => {
  const [activeLink, setActiveLink] = useState('Dashboard'); // Default active link is Dashboard

  // Handle link click and set active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <section id="sidebar" className={sidebarVisible ? '' : 'hide'}>
      {/* Sidebar Brand */}
      <div className="sidebar-header">
        <a href="#" className="brand">
          <i className="bx bxs-smile"></i>
          {/* Show brand name when sidebar is visible */}
          {sidebarVisible && <span className="text">AdminHub</span>}
        </a>
      </div>

      {/* Sidebar menu */}
      <ul className="side-menu top">
        <li className={activeLink === 'Purchase' ? 'active' : ''}>
          <Link to="/purchase" onClick={() => handleLinkClick('Purchase')}>
            <i className="bx bxs-cart"></i>
            {sidebarVisible && <span className="text">Purchase</span>}
          </Link>
        </li>
        <li className={activeLink === 'Inventory' ? 'active' : ''}>
          <Link to="/inventory" onClick={() => handleLinkClick('Inventory')}>
            <i className="bx bxs-package"></i>
            {sidebarVisible && <span className="text">Inventory</span>}
          </Link>
        </li>
        <li className={activeLink === 'Sales' ? 'active' : ''}>
          <Link to="/sales" onClick={() => handleLinkClick('Sales')}>
            <i className="bx bxs-store"></i>
            {sidebarVisible && <span className="text">Sales</span>}
          </Link>
        </li>
        <li className={activeLink === 'Report' ? 'active' : ''}>
          <Link to="/report" onClick={() => handleLinkClick('Report')}>
            <i className="bx bxs-file"></i>
            {sidebarVisible && <span className="text">Report</span>}
          </Link>
        </li>
      </ul>

      {/* Additional menu items */}
      <ul className="side-menu">
        <li>
          <Link to="/settings">
            <i className="bx bxs-cog"></i>
            {sidebarVisible && <span className="text">Settings</span>}
          </Link>
        </li>
        <li>
          <Link to="/account">
            <i className="bx bxs-log-out-circle"></i>
            {sidebarVisible && <span className="text">Account</span>}
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
