import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { upvotePost, downvotePost } from "../../features/posts/postsSlice";

import "./Post.css";

function Post({
  id,
  subreddit,
  author,
  time,
  title,
  score,
  comments,
  image,
  url,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${id}`);
  };

  const handleShare = async (event) => {
    event.stopPropagation();

    const postUrl = `${window.location.origin}/post/${id}`;

    try {
      await navigator.clipboard.writeText(postUrl);
    } catch {
      // Ignore clipboard errors for now
    }
  };

  return (
    <article className="post-card" onClick={handlePostClick}>
      {/* Post information */}
      <div className="post-meta">
        <div className="community-icon">
          {subreddit?.charAt(0).toUpperCase()}
        </div>

        <div className="post-meta-text">
          <div>
            <span className="post-community">!{subreddit}</span>

            <span className="post-dot">•</span>

            <span className="post-time">{time}</span>
          </div>

          {author && <span className="post-author">@{author}</span>}
        </div>
      </div>

      {/* Title */}
      <h2 className="post-title">{title}</h2>

      {/* Image */}
      {image && (
        <div className="post-media">
          <img className="post-image" src={image} alt={title} loading="lazy" />
        </div>
      )}

      {/* Actions */}
      <div className="post-actions">
        <div
          className="vote-actions"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            className="vote-button"
            aria-label="Upvote"
            onClick={() => dispatch(upvotePost(id))}
          >
            ↑
          </button>

          <span className="vote-score">{score}</span>

          <button
            className="vote-button"
            aria-label="Downvote"
            onClick={() => dispatch(downvotePost(id))}
          >
            ↓
          </button>
        </div>

        <button
          className="post-action-button"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/post/${id}`);
          }}
        >
          💬 {comments}
        </button>

        <button className="post-action-button" onClick={handleShare}>
          ↗ Share
        </button>

        {url && (
          <a
            className="post-action-button post-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            ↗ Open
          </a>
        )}
      </div>
    </article>
  );
}

export default Post;
