import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { upvotePost, downvotePost } from "../features/posts/postsSlice";

import {
  fetchComments,
  selectComments,
  selectCommentsLoading,
  selectCommentsError,
} from "../features/comments/commentsSlice";

import { getPost, getComments } from "../api/lemmyApi";

import "./PostPage.css";

function PostPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postId = Number(id);

  const comments = useSelector(selectComments);
  const commentsLoading = useSelector(selectCommentsLoading);
  const commentsError = useSelector(selectCommentsError);

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setPostLoading(true);
        setPostError(null);

        const postData = await getPost(postId);

        setPost(postData);
      } catch (error) {
        setPostError(error.message);
      } finally {
        setPostLoading(false);
      }
    };

    loadPost();

    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (postLoading) {
    return (
      <main className="post-page">
        <p>Loading post...</p>
      </main>
    );
  }

  if (postError) {
    return (
      <main className="post-page">
        <button className="back-button" onClick={() => navigate("/")}>
          <span className="back-icon">←</span>
          Back to posts
        </button>

        <p className="post-error">{postError}</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="post-page">
        <p>Post not found.</p>
      </main>
    );
  }

  return (
    <main className="post-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to posts
      </button>

      <article className="post-detail-card">
        <div className="post-meta">
          <span className="subreddit">🔴 !{post.subreddit}</span>

          <span>• {post.time}</span>
        </div>

        <h1 className="post-detail-title">{post.title}</h1>

        {post.body && <p className="post-body">{post.body}</p>}

        {post.image && (
          <div className="post-detail-media">
            <img
              className="post-detail-image"
              src={post.image}
              alt={post.title}
            />
          </div>
        )}

        <div className="post-actions">
          <div className="vote-actions">
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

          <span className="action-button">💬 {post.comments} comments</span>

          {post.url && (
            <a
              className="action-button"
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ Open
            </a>
          )}
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments</h2>

        {commentsLoading && <p>Loading comments...</p>}

        {commentsError && <p className="comments-error">{commentsError}</p>}

        {!commentsLoading && !commentsError && comments.length === 0 && (
          <p>No comments yet.</p>
        )}

        {!commentsLoading &&
          !commentsError &&
          comments.map((comment) => (
            <article className="comment-card" key={comment.id}>
              <div className="comment-header">
                <strong>{comment.author}</strong>

                <span>{comment.time}</span>
              </div>

              <p>{comment.body}</p>

              <span className="comment-score">↑ {comment.score}</span>
            </article>
          ))}
      </section>
    </main>
  );
}

export default PostPage;
