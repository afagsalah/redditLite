import { useDispatch, useSelector } from "react-redux";

import {
  setSearchTerm,
  selectSearchTerm,
} from "../../features/posts/postsSlice";

import "./Header.css";
import logo from "../../assets/RedditLite Logo.png";
function Header({ darkMode, toggleDarkMode, toggleMobileMenu }) {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <header className="header">
      <button
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      <div className="logo">
        <img src={logo} alt="RedditLite" className="logo-image" />
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button>🔍</button>
      </div>

      <button
        className="theme-button"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;
