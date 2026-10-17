import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span>🔴</span>
        <h1>Reddit</h1>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search posts and communities..."
        />
        <button>🔍</button>
      </div>

      <button className="theme-button">🌙</button>
    </header>
  );
}

export default Header;