import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./HomePage.css";
import PostList from "../components/PostList/PostList";
import { fetchPosts } from "../features/posts/postsSlice";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts("popular"));
  }, [dispatch]);

  return (
    <main className="home-page">
      <div className="feed-container">
        <div className="feed-heading">
          <h1>Home</h1>
          <p>Discover what's happening today</p>
        </div>

        <div className="sort-tabs">
          <button className="sort-button active">🔥 Hot</button>
          <button className="sort-button">✨ New</button>
          <button className="sort-button">📊 Top</button>
        </div>

        <PostList />
      </div>
    </main>
  );
}

export default HomePage;
