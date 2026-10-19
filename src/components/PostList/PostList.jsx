import { useDispatch, useSelector } from "react-redux";

import Post from "../Post/Post";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

import {
  fetchPosts,
  selectPosts,
  selectLoading,
  selectError,
  selectSearchTerm,
  selectSelectedSubreddit,
  selectSortType,
} from "../../features/posts/postsSlice";

import "./PostList.css";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchTerm = useSelector(selectSearchTerm);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const sortType = useSelector(selectSortType);

  // Search filtering only.
  // Sorting is now handled by the Lemmy API.
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortMap = {
    hot: "Hot",
    new: "New",
    top: "TopDay",
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={() =>
          dispatch(
            fetchPosts({
              community: selectedSubreddit,
              sort: sortMap[sortType],
            }),
          )
        }
      />
    );
  }

  if (filteredPosts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="post-list">
      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          subreddit={post.subreddit}
          author={post.author}
          time={post.time}
          title={post.title}
          score={post.score}
          comments={post.comments}
          image={post.image}
          url={post.url}
        />
      ))}
    </div>
  );
}

export default PostList;
