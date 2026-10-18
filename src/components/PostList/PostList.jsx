import { useSelector } from "react-redux";

import {
  selectPosts,
  selectPostsLoading,
  selectPostsError,
  selectSearchTerm,
} from "../../features/posts/postsSlice";

import Post from "../Post/Post";
import "./PostList.css";

function PostList() {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  //search
  const searchTerm = useSelector(selectSearchTerm);
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  return (
    <div className="post-list">
      {filteredPosts.map((post) => (
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
