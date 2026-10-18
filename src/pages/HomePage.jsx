import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./HomePage.css";
import PostList from "../components/PostList/PostList";

import {
  fetchPosts,
  setSortType,
  selectSortType,
} from "../features/posts/postsSlice";
import { getPosts } from "../api/lemmyApi";
function HomePage() {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSortType);

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
          <button
            className={
              sortType === "hot" ? "sort-button active" : "sort-button"
            }
            onClick={() => dispatch(setSortType("hot"))}
          >
            🔥 Hot
          </button>

          <button
            className={
              sortType === "new" ? "sort-button active" : "sort-button"
            }
            onClick={() => dispatch(setSortType("new"))}
          >
            ✨ New
          </button>

          <button
            className={
              sortType === "top" ? "sort-button active" : "sort-button"
            }
            onClick={() => dispatch(setSortType("top"))}
          >
            📊 Top
          </button>
        </div>

        <PostList />
      </div>
    </main>
  );
}

export default HomePage;
