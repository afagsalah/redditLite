import "./RightSidebar.css";

function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <section className="right-card trending-card">
        <h3>📈 Trending</h3>

        <div className="trending-item">
          <span className="trend-number">1</span>
          <div className="trend-info">
            <strong>React</strong>
            <span>12.4k posts</span>
          </div>
          <span className="trend-icon">🔥</span>
        </div>

        <div className="trending-item">
          <span className="trend-number">2</span>
          <div className="trend-info">
            <strong>AI</strong>
            <span>10.2k posts</span>
          </div>
          <span className="trend-icon">🔥</span>
        </div>

        <div className="trending-item">
          <span className="trend-number">3</span>
          <div className="trend-info">
            <strong>Gaming</strong>
            <span>8.1k posts</span>
          </div>
          <span className="trend-icon">🔥</span>
        </div>

        <div className="trending-item">
          <span className="trend-number">4</span>
          <div className="trend-info">
            <strong>Technology</strong>
            <span>6.4k posts</span>
          </div>
        </div>

        <div className="trending-item">
          <span className="trend-number">5</span>
          <div className="trend-info">
            <strong>Science</strong>
            <span>5.9k posts</span>
          </div>
        </div>
      </section>

      <section className="right-card about-card">
        <h3>🔴 About Reddit</h3>

        <p>
          A modern Reddit client built with React and Redux. Discover, search,
          and explore content from Reddit.
        </p>

        <a className="github-button" href="#">
          View on GitHub
        </a>
      </section>
    </aside>
  );
}

export default RightSidebar;
