import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedSubreddit,
  selectSelectedSubreddit,
} from "../../features/posts/postsSlice";

import "./Sidebar.css";

function Sidebar({ onNavigate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const handleSubredditClick = (subreddit) => {
    dispatch(setSelectedSubreddit(subreddit));
    navigate("/");

    if (onNavigate) {
      onNavigate();
    }
  };
  return (
    <aside className="sidebar">
      {/* DISCOVER */}
      <h3 className="sidebar-title">DISCOVER</h3>

      <div className="sidebar-menu">
        {/* Home */}
        <button
          className={
            selectedSubreddit === "home"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() => handleSubredditClick("home")}
        >
          🏠 Home
        </button>

        {/* Popular */}
        <button
          className={
            selectedSubreddit === "popular"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() => handleSubredditClick("popular")}
        >
          🔥 Popular
        </button>
      </div>

      {/* TOPICS */}
      <h3 className="sidebar-title topics-title">TOPICS</h3>

      <div className="sidebar-menu">
        <button
          className={
            selectedSubreddit === "technology"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() => handleSubredditClick("technology")}
        >
          💻 Technology
        </button>

        <button
          className={
            selectedSubreddit === "programming"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() => handleSubredditClick("programming")}
        >
          👨‍💻 Programming
        </button>

        <button
          className={
            selectedSubreddit === "science"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() => handleSubredditClick("science")}
        >
          🔬 Science
        </button>

        <button
          className={
            selectedSubreddit === "gaming"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() => handleSubredditClick("gaming")}
        >
          🎮 Gaming
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
