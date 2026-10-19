import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { MemoryRouter, Routes, Route } from "react-router-dom";

import PostPage from "./PostPage";

import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";

import { getPost, getComments } from "../api/lemmyApi";

jest.mock("../api/lemmyApi");

// -----------------------------
// Test data
// -----------------------------

const testPost = {
  id: 123,
  subreddit: "programming",
  author: "mohammed",
  time: "10 minutes ago",
  title: "Learning React Testing",
  body: "This is a test post about React.",
  score: 50,
  comments: 2,
  image: null,
  url: "https://example.com",
};

const testComments = [
  {
    id: 1,
    postId: 123,
    author: "alice",
    body: "Great post!",
    score: 10,
    time: "5 minutes ago",
  },

  {
    id: 2,
    postId: 123,
    author: "bob",
    body: "Very useful information.",
    score: 5,
    time: "2 minutes ago",
  },
];

// -----------------------------
// Helper
// -----------------------------

function renderPostPage() {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
      comments: commentsReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/post/123"]}>
        <Routes>
          <Route path="/post/:id" element={<PostPage />} />

          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
}

// -----------------------------
// Before every test
// -----------------------------

beforeEach(() => {
  jest.clearAllMocks();

  getPost.mockResolvedValue(testPost);

  getComments.mockResolvedValue(testComments);
});

// -----------------------------
// Test 1
// -----------------------------

test("displays loading message initially", async () => {
  renderPostPage();

  expect(screen.getByText(/loading post/i)).toBeInTheDocument();

  // Wait for the asynchronous post loading to finish
  await screen.findByRole("heading", {
    name: "Learning React Testing",
  });
});

// -----------------------------
// Test 2
// -----------------------------

test("displays the post after loading", async () => {
  renderPostPage();

  expect(
    await screen.findByRole("heading", {
      name: "Learning React Testing",
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByText("This is a test post about React."),
  ).toBeInTheDocument();

  expect(screen.getByText("🔴 !programming")).toBeInTheDocument();

  expect(screen.getByText("50")).toBeInTheDocument();
});

// -----------------------------
// Test 3
// -----------------------------

test("loads the correct post using the URL id", async () => {
  renderPostPage();

  await waitFor(() => {
    expect(getPost).toHaveBeenCalledWith(123);
  });
});

// -----------------------------
// Test 4
// -----------------------------

test("displays comments after loading", async () => {
  renderPostPage();

  expect(await screen.findByText("Great post!")).toBeInTheDocument();

  expect(screen.getByText("Very useful information.")).toBeInTheDocument();

  expect(screen.getByText("alice")).toBeInTheDocument();

  expect(screen.getByText("bob")).toBeInTheDocument();
});

// -----------------------------
// Test 5
// -----------------------------

test("loads comments for the correct post", async () => {
  renderPostPage();

  await waitFor(() => {
    expect(getComments).toHaveBeenCalledWith(123);
  });
});

// -----------------------------
// Test 6
// -----------------------------

test("displays an error when the post cannot be loaded", async () => {
  getPost.mockRejectedValue(new Error("Failed to load post"));

  renderPostPage();

  expect(await screen.findByText("Failed to load post")).toBeInTheDocument();
});

// -----------------------------
// Test 7
// -----------------------------

test("back button navigates to the home page", async () => {
  const user = userEvent.setup();

  renderPostPage();

  const backButton = await screen.findByRole("button", {
    name: /back to posts/i,
  });

  await user.click(backButton);

  expect(screen.getByText("Home Page")).toBeInTheDocument();
});

// -----------------------------
// Test 8
// -----------------------------

test("displays the external post link", async () => {
  renderPostPage();

  const openLink = await screen.findByRole("link", {
    name: /open/i,
  });

  expect(openLink).toHaveAttribute("href", "https://example.com");

  expect(openLink).toHaveAttribute("target", "_blank");
});
