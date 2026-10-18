import { useDispatch, useSelector } from "react-redux";

import {
  setSearchTerm,
  selectSearchTerm,
} from "../../features/posts/postsSlice";

import "./Header.css";

function Header({ darkMode, toggleDarkMode }) {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <header className="header">
      <div className="logo">
        <span>🔴</span>
        <h1>RedditLite</h1>
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
