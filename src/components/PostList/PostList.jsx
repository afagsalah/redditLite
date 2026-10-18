import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  selectPosts,
  selectPostsLoading,
  selectPostsError,
  selectSearchTerm,
  selectSortType,
  selectSelectedSubreddit,
} from "../../features/posts/postsSlice";
import Post from "../Post/Post";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import "./PostList.css";

function PostList() {
  const dispatch = useDispatch();

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

    // Topics
    return post.subreddit === selectedSubreddit;
  });

  // 2. Filter by search term
  const filteredPosts = subredditPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 3. Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // New
    if (sortType === "new") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    // Top
    if (sortType === "top") {
      return b.score - a.score;
    }

    // Hot
    return b.score + b.comments - (a.score + a.comments);
  });

  // Loading state
  if (loading) {
    return <Loading />;
  }
  // Recoverable error state
  if (error) {
    return (
      <Error
        message={error}
        onRetry={() => dispatch(fetchPosts(selectedSubreddit))}
      />
    );
  }

  // No results
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
          image={post.image}
        />
      ))}
    </div>
  );
}

export default PostList;
