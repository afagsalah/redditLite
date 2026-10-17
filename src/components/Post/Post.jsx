import "./Post.css";

function Post({ subreddit, time, title, score, comments }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span className="subreddit">🔴 r/{subreddit}</span>
        <span>• {time}</span>
      </div>

      <h2 className="post-title">{title}</h2>

      <div className="post-image">Post Image</div>

      <div className="post-actions">
        <button>↑ {score}</button>
        <button>💬 {comments}</button>
        <button>🔗 Share</button>
      </div>
    </article>
  );
}

export default Post;
