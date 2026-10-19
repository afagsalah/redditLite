import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import HomePage from "./HomePage";
import postsReducer from "../features/posts/postsSlice";

import * as lemmyApi from "../api/lemmyApi";

// Do not make real Lemmy requests during tests
jest.mock("../api/lemmyApi");

function renderHomePage(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },

    preloadedState: {
      posts: {
        posts: [],
        loading: false,
        error: null,
        selectedSubreddit: "home",
        searchTerm: "",
        sortType: "hot",
        ...preloadedState,
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>,
  );

  return store;
}
beforeEach(() => {
  lemmyApi.getPosts.mockResolvedValue([]);
});

// Test 1
test("displays Home heading initially", async () => {
  const store = renderHomePage();

  expect(
    screen.getByRole("heading", {
      name: "Home",
    }),
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(store.getState().posts.loading).toBe(false);
  });
}); // Test 2
test("displays Popular heading when Popular is selected", async () => {
  const store = renderHomePage({
    selectedSubreddit: "popular",
  });

  expect(
    screen.getByRole("heading", {
      name: "Popular",
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/explore popular posts and discussions/i),
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(store.getState().posts.loading).toBe(false);
  });
});

// Test 3
test("displays Technology heading when Technology is selected", () => {
  renderHomePage({
    selectedSubreddit: "technology",
  });

  expect(
    screen.getByRole("heading", {
      name: "Technology",
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/explore the latest technology discussions/i),
  ).toBeInTheDocument();
});

// Test 4
test("displays Hot, New and Top sort buttons", () => {
  renderHomePage();

  expect(
    screen.getByRole("button", {
      name: /hot/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /new/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /top/i,
    }),
  ).toBeInTheDocument();
});

// Test 5
test("changes sort type to New when New is clicked", async () => {
  const user = userEvent.setup();

  const store = renderHomePage();

  const newButton = screen.getByRole("button", {
    name: /new/i,
  });

  await user.click(newButton);

  expect(store.getState().posts.sortType).toBe("new");

  await waitFor(() => {
    expect(store.getState().posts.loading).toBe(false);
  });
});

// Test 6
test("changes sort type to Top when Top is clicked", async () => {
  const user = userEvent.setup();

  const store = renderHomePage();

  const topButton = screen.getByRole("button", {
    name: /top/i,
  });

  await user.click(topButton);

  expect(store.getState().posts.sortType).toBe("top");
});
