import { useSelector } from "react-redux";

import {
  selectPosts,
  selectPostsLoading,
  selectPostsError,
  selectSearchTerm,
  selectSortType,
} from "../../features/posts/postsSlice";

import Post from "../Post/Post";
import "./PostList.css";

function PostList() {
  // Get data from Redux
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const searchTerm = useSelector(selectSearchTerm);
  const sortType = useSelector(selectSortType);

  // 1. Filter posts based on the search term
  const filteredPosts = posts.filter((post) =>
    post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 2. Sort the filtered posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // NEW: newest post first
    if (sortType === "new") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    // TOP: highest score first
    if (sortType === "top") {
      return b.score - a.score;
    }

    // HOT: combination of score and comments
    return (
      b.score +
      b.comments -
      (a.score + a.comments)
    );
  });

  // Loading state
  if (loading) {
    return <p>Loading posts...</p>;
  }

  // Error state
  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  // No search results
  if (sortedPosts.length === 0) {
    return <p>No posts found.</p>;
  }

  // Display posts
  return (
    <div className="post-list">
      {sortedPosts.map((post) => (
        <Post
          key={post.id}
          subreddit={post.subreddit}
          time={post.time}
          title={post.title}
          score={post.score}
          comments={post.comments}
        />
      ))}
    </div>
  );
}

export default PostList;