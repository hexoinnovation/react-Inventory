import { useState, useRef } from "react";

const Navbar = ({ handleMenuClick }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const menuBarRef = useRef(null); // Ref for the menu icon

  const toggleSearch = (e) => {
    if (window.innerWidth < 576) {
      e.preventDefault(); // Prevent form submission
      setSearchVisible(!searchVisible); // Toggle search visibility
    }
  };

  return (
    <nav>
      {/* Menu Icon */}
      <div className="search-menu">
        <i
          ref={menuBarRef}
          className="bx bx-menu text-black"
          onClick={handleMenuClick} // Trigger the sidebar toggle
        ></i>

        {/* Search form with dynamic classes */}
        <form action="#" className="search-form">
          <div className={`form-input ${searchVisible ? "show" : ""}`}>
            <input type="search" placeholder="Search..." />
            <button type="submit" className="search-btn" onClick={toggleSearch}>
              {/* Toggle icon based on search visibility */}
              <i className={`bx ${searchVisible ? "bx-x" : "bx-search"}`}></i>
            </button>
          </div>
        </form>
      </div>

      <div className="theme-profile">
        <input type="checkbox" id="switch-mode" hidden />
        <label htmlFor="switch-mode" className="switch-mode"></label>

        <a href="#" className="profile">
          <img src="img/people.png" alt="Profile" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
