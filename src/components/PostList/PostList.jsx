import Post from "../Post/Post";
import { postsData } from "../../data/postsData";
import "./PostList.css";

function PostList() {
  return (
    <div className="post-list">
      {postsData.map((post) => (
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
