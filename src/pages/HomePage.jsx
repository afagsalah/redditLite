import "./HomePage.css";

function HomePage() {
  return (
    <main className="home-page">
      <div className="feed-heading">
        <h1>Home</h1>
        <p>Discover what's happening today</p>
      </div>

      <div className="sort-tabs">
        <button className="sort-button active">🔥 Hot</button>

        <button className="sort-button">✨ New</button>

        <button className="sort-button">📊 Top</button>
      </div>
    </main>
  );
}

export default HomePage;
