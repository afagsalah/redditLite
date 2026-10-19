import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "./Sidebar";
import postsReducer from "../../features/posts/postsSlice";

// Helper function to render Sidebar with Redux and Router
function renderSidebar() {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>,
  );

  return store;
}

// Test 1
test("displays the sidebar categories", () => {
  renderSidebar();

  expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /popular/i })).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /technology/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /programming/i }),
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /science/i })).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /gaming/i })).toBeInTheDocument();
});

// Test 2
test("Home is selected initially", () => {
  const store = renderSidebar();

  expect(store.getState().posts.selectedSubreddit).toBe("home");
});

// Test 3
test("changes selected subreddit to Popular when clicked", async () => {
  const user = userEvent.setup();

  const store = renderSidebar();

  const popularButton = screen.getByRole("button", {
    name: /popular/i,
  });

  await user.click(popularButton);

  expect(store.getState().posts.selectedSubreddit).toBe("popular");
});

// Test 4
test("changes selected subreddit to Technology when clicked", async () => {
  const user = userEvent.setup();

  const store = renderSidebar();

  const technologyButton = screen.getByRole("button", {
    name: /technology/i,
  });

  await user.click(technologyButton);

  expect(store.getState().posts.selectedSubreddit).toBe("technology");
});

// Test 5
test("changes selected subreddit to Programming when clicked", async () => {
  const user = userEvent.setup();

  const store = renderSidebar();

  const programmingButton = screen.getByRole("button", {
    name: /programming/i,
  });

  await user.click(programmingButton);

  expect(store.getState().posts.selectedSubreddit).toBe("programming");
});
