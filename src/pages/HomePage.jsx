import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./HomePage.css";
import PostList from "../components/PostList/PostList";

import {
  fetchPosts,
  setSortType,
  selectSortType,
  selectSelectedSubreddit,
} from "../features/posts/postsSlice";

function HomePage() {
  const dispatch = useDispatch();

  const sortType = useSelector(selectSortType);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  const sortMap = {
    hot: "Hot",
    new: "New",
    top: "TopDay",
  };

  useEffect(() => {
    dispatch(
      fetchPosts({
        community: selectedSubreddit,
        sort: sortMap[sortType],
      }),
    );
  }, [dispatch, selectedSubreddit, sortType]);

  const handleSortChange = (newSortType) => {
    dispatch(setSortType(newSortType));
  };
  const pageTitles = {
    home: {
      title: "Home",
      description: "Discover what's happening today",
    },

    popular: {
      title: "Popular",
      description: "Explore popular posts and discussions",
    },

    technology: {
      title: "Technology",
      description: "Explore the latest technology discussions",
    },

    programming: {
      title: "Programming",
      description: "Discover programming posts and discussions",
    },

    science: {
      title: "Science",
      description: "Explore science news and discussions",
    },

    gaming: {
      title: "Gaming",
      description: "Discover gaming posts and discussions",
    },
  };

  const currentPage = pageTitles[selectedSubreddit] || {
    title: selectedSubreddit,
    description: `Explore posts from !${selectedSubreddit}`,
  };
  return (
    <main className="home-page">
      <div className="feed-container">
        <div className="feed-heading">
          <h1>{currentPage.title}</h1>
          <p>{currentPage.description}</p>
        </div>

        <div className="sort-tabs">
          <button
            className={
              sortType === "hot" ? "sort-button active" : "sort-button"
            }
            onClick={() => handleSortChange("hot")}
          >
            🔥 Hot
          </button>

          <button
            className={
              sortType === "new" ? "sort-button active" : "sort-button"
            }
            onClick={() => handleSortChange("new")}
          >
            ✨ New
          </button>

          <button
            className={
              sortType === "top" ? "sort-button active" : "sort-button"
            }
            onClick={() => handleSortChange("top")}
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
