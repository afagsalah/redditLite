import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Post from "./Post";
import postsReducer from "../../features/posts/postsSlice";

function renderPost() {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <Post
                id={123}
                subreddit="programming"
                author="mohammed"
                time="10 minutes ago"
                title="Learning React Testing"
                score={50}
                comments={12}
                image={null}
                url={null}
              />
            }
          />

          <Route path="/post/:id" element={<div>Post Detail Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
}

// Test 1
test("displays the post information", () => {
  renderPost();

  expect(screen.getByText("Learning React Testing")).toBeInTheDocument();

  expect(screen.getByText("!programming")).toBeInTheDocument();

  expect(screen.getByText("@mohammed")).toBeInTheDocument();

  expect(screen.getByText("10 minutes ago")).toBeInTheDocument();

  expect(screen.getByText("50")).toBeInTheDocument();

  expect(screen.getByText(/12/)).toBeInTheDocument();
});

// Test 2
test("navigates to post details when the post title is clicked", async () => {
  const user = userEvent.setup();

  renderPost();

  const title = screen.getByText("Learning React Testing");

  await user.click(title);

  expect(screen.getByText("Post Detail Page")).toBeInTheDocument();
});

// Test 3
test("navigates to post details when comments button is clicked", async () => {
  const user = userEvent.setup();

  renderPost();

  const commentsButton = screen.getByRole("button", { name: /12/ });

  await user.click(commentsButton);

  expect(screen.getByText("Post Detail Page")).toBeInTheDocument();
});

// Test 4
test("displays the upvote and downvote buttons", () => {
  renderPost();

  expect(
    screen.getByRole("button", {
      name: /upvote/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /downvote/i,
    }),
  ).toBeInTheDocument();
});

// Test 5
test("clicking upvote does not navigate to post details", async () => {
  const user = userEvent.setup();

  renderPost();

  const upvoteButton = screen.getByRole("button", { name: /upvote/i });

  await user.click(upvoteButton);

  expect(screen.queryByText("Post Detail Page")).not.toBeInTheDocument();
});
