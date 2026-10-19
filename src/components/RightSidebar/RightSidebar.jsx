import "./RightSidebar.css";
import { useSelector } from "react-redux";
import { selectPosts } from "../../features/posts/postsSlice";

function RightSidebar() {
  const posts = useSelector(selectPosts);

  // Get the 3 highest-scoring posts from the current feed
  const trendingPosts = Object.values(
    posts.reduce((topPosts, post) => {
      const community = post.subreddit;

      // Keep only the highest-scoring post
      // from each community
      if (!topPosts[community] || post.score > topPosts[community].score) {
        topPosts[community] = post;
      }

      return topPosts;
    }, {}),
  )
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <aside className="right-sidebar">
      {/* Trending */}
      <section className="right-card trending-card">
        <h3>📈 Trending</h3>

        <div className="trending-list">
          {trendingPosts.map((post, index) => (
            <div className="trending-item" key={post.id}>
              <div className="trending-rank">{index + 1}</div>

              <div className="trending-content">
                <span className="trending-community">!{post.subreddit}</span>

                <p className="trending-title">{post.title}</p>

                <span className="trending-stats">
                  ↑ {post.score} · 💬 {post.comments}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="right-card about-card">
        <h3>🟢 About RedditLite</h3>

        <p>
          A modern social content client built with React and Redux. Discover,
          search, and explore content from Lemmy.
        </p>

        <a
          className="github-button"
          href="https://github.com/afagsalah/redditLite"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </section>
    </aside>
  );
}

export default RightSidebar;
