import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const [activeLink, setActiveLink] = useState("Dashboard"); // Default active link is Dashboard

  // Handle link click and set active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <section id="sidebar" className={sidebarVisible ? "" : "hide"}>
      {/* Sidebar Logo and Toggle Button for Mobile */}
      <div className="sidebar-header">
        <a href="#" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </a>
      </div>

      {/* Sidebar menu */}
      <ul className="side-menu">
        <div className="dash">
          <li className={activeLink === "Dashboard" ? "active" : ""}>
            <Link to="/" onClick={() => handleLinkClick("Dashboard")}>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>
        </div>

        <li className={activeLink === "Purchase" ? "active" : ""}>
          <Link to="/purchase" onClick={() => handleLinkClick("Purchase")}>
            <i className="bx bxs-package"></i>
            <span className="text">Purchase</span>
          </Link>
        </li>

        <li className={activeLink === "stocks" ? "active" : ""}>
          <Link to="/stocks" onClick={() => handleLinkClick("stocks")}>
            <i className="bx bxs-package"></i>
            <span className="text"> Stocks</span>
          </Link>
        </li>


        <li className={activeLink === "sales" ? "active" : ""}>
          <Link to="/sales" onClick={() => handleLinkClick("sales")}>
            <i className="bx bxs-package"></i>
            <span className="text">Sales</span>
          </Link>
        </li>

        <div className="label">
          <li className="medium:ml-20 x-small:ml-10 mb-1">
            <i className="bx bxs-package"></i>
            <span className="ml-2 font-extrabold font-label">INVENTORY</span>
          </li>
        </div>

        <li className={activeLink === "invoice" ? "active" : ""}>
          <Link to="/invoice" onClick={() => handleLinkClick("invoice")}>
            <i className="bx bxs-package"></i>
            <span className="text">Invoice</span>
          </Link>
        </li>

        <li className={activeLink === "shop" ? "active" : ""}>
          <Link to="/shop" onClick={() => handleLinkClick("shop")}>
            <i className="bx bxs-package"></i>
            <span className="text">Shop</span>
          </Link>
        </li>

        <li className={activeLink === "Order" ? "active" : ""}>
          <Link to="/order" onClick={() => handleLinkClick("order")}>
            <i className="bx bxs-package"></i>
            <span className="text">Order</span>
          </Link>
        </li>

        <div className="label">
          <li className="medium:ml-20 x-small:ml-10 mb-1 ">
            <i className="bx bxs-package"></i>
            <span className="ml-2 font-extrabold font-label">HRM</span>
          </li>
        </div>

        <li className={activeLink === "Attendence" ? "active" : ""}>
          <Link to="/attendence" onClick={() => handleLinkClick("Attendence")}>
            <i className="bx bxs-file"></i>
            <span className="text">Attendence</span>
          </Link>
        </li>

        <li className={activeLink === "employee" ? "active" : ""}>
          <Link to="/employee" onClick={() => handleLinkClick("employee")}>
            <i className="bx bxs-file"></i>
            <span className="text">Employee Details</span>
          </Link>
        </li>

        <li className={activeLink === "salary" ? "active" : ""}>
          <Link to="/salary" onClick={() => handleLinkClick("salary")}>
            <i className="bx bxs-file"></i>
            <span className="text">Salary</span>
          </Link>
        </li>
      </ul>

      {
        <ul className="side-menu">
          <li>
            <Link to="/help">
              <i className="bx bxs-cog"></i>
              <span className="text">help</span>
            </Link>
          </li>
        </ul>
      }
    </section>
  );
};

export default Sidebar;
