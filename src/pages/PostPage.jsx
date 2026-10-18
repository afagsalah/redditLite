import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectPosts,
  upvotePost,
  downvotePost,
} from "../features/posts/postsSlice";

import { selectComments } from "../features/comments/commentsSlice";

import "./PostPage.css";

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);
  const comments = useSelector(selectComments);

  const post = posts.find((post) => post.id === Number(id));

  const postComments = comments.filter(
    (comment) => comment.postId === Number(id),
  );

  if (!post) {
    return (
      <main className="post-page">
        <div className="post-page-container post-not-found">
          <h1>Post not found</h1>

          <button className="back-button" onClick={() => navigate("/")}>
            ← Back to posts
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="post-page">
      <div className="post-page-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to posts
        </button>

        <div className="post-page-meta">
          <span className="post-page-subreddit">🔴 r/{post.subreddit}</span>

          <span>• {post.time}</span>
        </div>

        <h1 className="post-page-title">{post.title}</h1>

        <div className="post-page-image">Post Image</div>

        <div className="post-page-actions">
          <div className="post-page-votes">
            <button
              className="upvote"
              onClick={() => dispatch(upvotePost(post.id))}
            >
              ↑
            </button>

            <span>{post.score}</span>

            <button
              className="downvote"
              onClick={() => dispatch(downvotePost(post.id))}
            >
              ↓
            </button>
          </div>

          <button className="post-page-action-button">
            💬 {post.comments} comments
          </button>

          <button className="post-page-action-button">↗ Share</button>
        </div>

        <section className="comments-section">
          <h2>Comments</h2>

          {postComments.length === 0 ? (
            <p className="no-comments">No comments yet.</p>
          ) : (
            postComments.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <div className="comment-meta">
                  <strong>u/{comment.author}</strong>

                  <span>• {comment.time}</span>
                </div>

                <p className="comment-body">{comment.body}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default PostPage;
