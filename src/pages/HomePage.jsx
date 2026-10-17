import "./HomePage.css";
import Post from "../components/Post/Post";

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
      <Post
        subreddit="C#"
        time="2 hours ago"
        title="React introduces several new features"
        score="1.2k"
        comments="184"
      />
      <Post
        subreddit="science"
        time="4 hours ago"
        title="Scientists announce a fascinating new discovery"
        score="853"
        comments="76"
      />gi
    </main>
  );
}

export default HomePage;
