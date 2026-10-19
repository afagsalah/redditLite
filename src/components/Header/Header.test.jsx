import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Header from "./Header";
import postsReducer from "../../features/posts/postsSlice";

function renderHeader({ darkMode = false, toggleDarkMode = jest.fn() } = {}) {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

  render(
    <Provider store={store}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Provider>,
  );

  return { store, toggleDarkMode };
}

test("displays the RedditLite logo", () => {
  renderHeader();

  expect(screen.getByAltText("RedditLite")).toBeInTheDocument();
});

test("displays the search input", () => {
  renderHeader();

  expect(screen.getByPlaceholderText(/search posts/i)).toBeInTheDocument();
});

test("updates the search term when the user types", async () => {
  const user = userEvent.setup();

  const { store } = renderHeader();

  const searchInput = screen.getByPlaceholderText(/search posts/i);

  await user.type(searchInput, "React");

  expect(searchInput).toHaveValue("React");

  expect(store.getState().posts.searchTerm).toBe("React");
});

test("calls toggleDarkMode when theme button is clicked", async () => {
  const user = userEvent.setup();

  const toggleDarkMode = jest.fn();

  renderHeader({ toggleDarkMode });

  const themeButton = screen.getByRole("button", {
    name: /switch to dark mode/i,
  });

  await user.click(themeButton);

  expect(toggleDarkMode).toHaveBeenCalledTimes(1);
});
