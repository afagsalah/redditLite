import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { upvotePost, downvotePost } from "../../features/posts/postsSlice";

import "./Post.css";

function Post({ id, subreddit, time, title, score, comments, image }) {
  const dispatch = useDispatch();
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

      {image && <img className="post-image" src={image} alt={title} />}

      <div className="post-actions">
        <div className="vote-actions">
          <button
            className="upvote"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(upvotePost(id));
            }}
          >
            ↑
          </button>
          <span>{score}</span>
          <button
            className="downvote"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(downvotePost(id));
            }}
          >
            ↓
          </button>
        </div>

        <button className="action-button">💬 {comments} comments</button>

        <button className="action-button">↗ Share</button>
      </div>
    </article>
  );
}

export default Post;
