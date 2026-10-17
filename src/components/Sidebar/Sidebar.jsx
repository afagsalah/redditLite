import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">DISCOVER</h3>

      <nav className="sidebar-menu">
        <button className="sidebar-item active">
          <span>🏠</span>
          Home
        </button>

        <button className="sidebar-item">
          <span>🔥</span>
          Popular
        </button>

        <button className="sidebar-item">
          <span>✨</span>
          New
        </button>
      </nav>

      <h3 className="sidebar-title topics-title">TOPICS</h3>

      <nav className="sidebar-menu">
        <button className="sidebar-item">
          <span>💻</span>
          Technology
        </button>

        <button className="sidebar-item">
          <span>{"</>"}</span>
          Programming
        </button>

        <button className="sidebar-item">
          <span>🔬</span>
          Science
        </button>

        <button className="sidebar-item">
          <span>🎮</span>
          Gaming
        </button>

        <button className="sidebar-item">
          <span>🎬</span>
          Movies
        </button>

        <button className="sidebar-item">
          <span>🏆</span>
          Sports
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
