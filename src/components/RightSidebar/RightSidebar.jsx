import "./RightSidebar.css";

function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <section className="right-card">
        <h3>📈 Trending</h3>

        <div className="trending-item">
          <span>1</span>
          <p>React</p>
        </div>

        <div className="trending-item">
          <span>2</span>
          <p>Artificial Intelligence</p>
        </div>

        <div className="trending-item">
          <span>3</span>
          <p>Gaming</p>
        </div>
      </section>

      <section className="right-card">
        <h3>About Reddit</h3>

        <p className="about-text">
          A modern Reddit client built with React and Redux.
        </p>
      </section>
    </aside>
  );
}

export default RightSidebar;
