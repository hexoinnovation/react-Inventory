import { useState } from "react";

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = (e) => {
    if (window.innerWidth < 576) {
      e.preventDefault(); // Prevent the form from submitting
      setSearchVisible(!searchVisible); // Toggle search visibility
    }
  };

  return (
    <nav>
      <div className="search-menu">
        <i className="bx bx-menu text-black"></i>

        

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
