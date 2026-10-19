import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import PostList from "./PostList";
import postsReducer from "../../features/posts/postsSlice";

// Sample posts used only for testing
const testPosts = [
  {
    id: 1,
    subreddit: "programming",
    author: "alice",
    time: "10 minutes ago",
    title: "Learning React Testing",
    score: 100,
    comments: 20,
    image: null,
    url: null,
  },
  {
    id: 2,
    subreddit: "technology",
    author: "bob",
    time: "20 minutes ago",
    title: "Artificial Intelligence News",
    score: 200,
    comments: 30,
    image: null,
    url: null,
  },
];

function renderPostList(preloadedState) {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },

    preloadedState: {
      posts: preloadedState,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    </Provider>,
  );

  return store;
}

// Test 1
test("displays posts", () => {
  renderPostList({
    posts: testPosts,
    loading: false,
    error: null,
    selectedSubreddit: "home",
    searchTerm: "",
    sortType: "hot",
  });

  expect(screen.getByText("Learning React Testing")).toBeInTheDocument();

  expect(screen.getByText("Artificial Intelligence News")).toBeInTheDocument();
});

// Test 2
test("displays loading message when posts are loading", () => {
  renderPostList({
    posts: [],
    loading: true,
    error: null,
    selectedSubreddit: "home",
    searchTerm: "",
    sortType: "hot",
  });

  expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
});

// Test 3
test("displays no posts found when posts array is empty", () => {
  renderPostList({
    posts: [],
    loading: false,
    error: null,
    selectedSubreddit: "home",
    searchTerm: "",
    sortType: "hot",
  });

  expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
});

// Test 4
test("filters posts using the search term", () => {
  renderPostList({
    posts: testPosts,
    loading: false,
    error: null,
    selectedSubreddit: "home",
    searchTerm: "React",
    sortType: "hot",
  });

  expect(screen.getByText("Learning React Testing")).toBeInTheDocument();

  expect(
    screen.queryByText("Artificial Intelligence News"),
  ).not.toBeInTheDocument();
});

// Test 5
test("search filtering is case insensitive", () => {
  renderPostList({
    posts: testPosts,
    loading: false,
    error: null,
    selectedSubreddit: "home",
    searchTerm: "react",
    sortType: "hot",
  });

  expect(screen.getByText("Learning React Testing")).toBeInTheDocument();
});
test("displays error message when loading posts fails", () => {
  renderPostList({
    posts: [],
    loading: false,
    error: "Failed to fetch Lemmy posts",
    selectedSubreddit: "home",
    searchTerm: "",
    sortType: "hot",
  });

  expect(screen.getByText("Failed to fetch Lemmy posts")).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /try again/i,
    }),
  ).toBeInTheDocument();
});
