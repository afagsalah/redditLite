import { useSelector } from "react-redux";

import {
  selectPosts,
  selectPostsLoading,
  selectPostsError,
  selectSearchTerm,
  selectSortType,
  selectSelectedSubreddit,
} from "../../features/posts/postsSlice";

import Post from "../Post/Post";
import "./PostList.css";

function PostList() {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const searchTerm = useSelector(selectSearchTerm);
  const sortType = useSelector(selectSortType);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  // 1. Filter posts by selected subreddit
  const subredditPosts = posts.filter((post) => {
    // Home: show all posts
    if (selectedSubreddit === "home") {
      return true;
    }

    // Popular: show posts with at least 1000 points
    if (selectedSubreddit === "popular") {
      return post.score >= 1000;
    }

    // Topics: show posts from the selected subreddit
    return post.subreddit === selectedSubreddit;
  });
  // 2. Filter the remaining posts by search term
  const filteredPosts = subredditPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 3. Sort the remaining posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // New: newest posts first
    if (sortType === "new") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    // Top: highest score first
    if (sortType === "top") {
      return b.score - a.score;
    }

    // Hot: score + comments
    return b.score + b.comments - (a.score + a.comments);
  });

  // Loading state
  if (loading) {
    return <p>Loading posts...</p>;
  }

  // Error state
  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  // No posts found
  if (sortedPosts.length === 0) {
    return <p>No posts found.</p>;
  }

  // Display posts
  return (
    <div className="post-list">
      {sortedPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
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
