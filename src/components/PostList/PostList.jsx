import { useSelector } from "react-redux";
import { selectPosts } from "../../features/posts/postsSlice";
import Post from "../Post/Post";
import "./PostList.css";

function PostList() {
  const posts = useSelector(selectPosts);

  return (
    <div className="post-list">
      {posts.map((post) => (
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
