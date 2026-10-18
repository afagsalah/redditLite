import { useNavigate } from "react-router-dom";
import "./Post.css";

function Post({ id, subreddit, time, title, score, comments }) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <article className="post-card" onClick={handlePostClick}>
      <div className="post-meta">
        <span className="subreddit">🔴 r/{subreddit}</span>

        <span>• {time}</span>
      </div>

      <h2 className="post-title">{title}</h2>

      <div className="post-image">Post Image</div>

      <div className="post-actions">
        <div className="vote-actions">
          <button className="upvote">↑</button>
          <span>{score}</span>
          <button className="downvote">↓</button>
        </div>

        <button className="action-button">💬 {comments} comments</button>

        <button className="action-button">↗ Share</button>
      </div>
    </article>
  );
}

export default Post;
