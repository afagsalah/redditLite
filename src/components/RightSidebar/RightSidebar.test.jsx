import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import RightSidebar from "./RightSidebar";
import postsReducer from "../../features/posts/postsSlice";

const testPosts = [
  {
    id: 1,
    subreddit: "science",
    title: "Science Highest",
    score: 500,
    comments: 30,
  },
  {
    id: 2,
    subreddit: "science",
    title: "Science Lower",
    score: 300,
    comments: 20,
  },
  {
    id: 3,
    subreddit: "technology",
    title: "Technology Highest",
    score: 400,
    comments: 15,
  },
  {
    id: 4,
    subreddit: "programming",
    title: "Programming Highest",
    score: 350,
    comments: 10,
  },
  {
    id: 5,
    subreddit: "gaming",
    title: "Gaming Highest",
    score: 100,
    comments: 5,
  },
];

function renderRightSidebar(posts = testPosts) {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },

    preloadedState: {
      posts: {
        posts,
        loading: false,
        error: null,
        selectedSubreddit: "home",
        searchTerm: "",
        sortType: "hot",
      },
    },
  });

  render(
    <Provider store={store}>
      <RightSidebar />
    </Provider>,
  );

  return store;
}

// Test 1
test("displays the Trending section", () => {
  renderRightSidebar();

  expect(
    screen.getByRole("heading", {
      name: /trending/i,
    }),
  ).toBeInTheDocument();
});

// Test 2
/*test("displays only the three highest-scoring posts", () => {
  renderRightSidebar();

  expect(screen.getByText("AI Post")).toBeInTheDocument();

  expect(screen.getByText("Space Post")).toBeInTheDocument();

  expect(screen.getByText("React Post")).toBeInTheDocument();

  expect(screen.queryByText("Gaming Post")).not.toBeInTheDocument();
});*/
test("displays only the highest-scoring post from each community", () => {
  renderRightSidebar();

  // Highest Science post appears
  expect(screen.getByText("Science Highest")).toBeInTheDocument();

  // Lower Science post must NOT appear
  expect(screen.queryByText("Science Lower")).not.toBeInTheDocument();

  // Highest posts from other communities appear
  expect(screen.getByText("Technology Highest")).toBeInTheDocument();

  expect(screen.getByText("Programming Highest")).toBeInTheDocument();

  // Only three communities are shown
  expect(screen.queryByText("Gaming Highest")).not.toBeInTheDocument();
});
// Test 3
test("orders trending posts from highest to lowest score", () => {
  renderRightSidebar();

  const trendingItems = document.querySelectorAll(".trending-title");

  const titles = Array.from(trendingItems).map(
    (element) => element.textContent,
  );

  expect(titles).toEqual([
    "Science Highest",
    "Technology Highest",
    "Programming Highest",
  ]);
});

// Test 4
test("displays subreddit names", () => {
  renderRightSidebar();

  expect(screen.getByText("!technology")).toBeInTheDocument();

  expect(screen.getByText("!science")).toBeInTheDocument();

  expect(screen.getByText("!programming")).toBeInTheDocument();
});

// Test 5
test("displays the About RedditLite section", () => {
  renderRightSidebar();

  expect(
    screen.getByRole("heading", {
      name: /about redditlite/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      /a modern social content client built with react and redux/i,
    ),
  ).toBeInTheDocument();
});

// Test 6
test("displays the GitHub link", () => {
  renderRightSidebar();

  const githubLink = screen.getByRole("link", {
    name: /view on github/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    "https://github.com/afagsalah/redditLite",
  );

  expect(githubLink).toHaveAttribute("target", "_blank");
});

// Test 7
test("displays no trending posts when the posts array is empty", () => {
  renderRightSidebar([]);

  expect(
    screen.getByRole("heading", {
      name: /trending/i,
    }),
  ).toBeInTheDocument();

  expect(document.querySelectorAll(".trending-item")).toHaveLength(0);
});
test("shows fewer than three trending posts when fewer communities are available", () => {
  const posts = [
    {
      id: 1,
      subreddit: "science",
      title: "Science Top",
      score: 500,
      comments: 20,
    },
    {
      id: 2,
      subreddit: "science",
      title: "Science Second",
      score: 400,
      comments: 10,
    },
    {
      id: 3,
      subreddit: "technology",
      title: "Technology Top",
      score: 300,
      comments: 15,
    },
  ];

  renderRightSidebar(posts);

  expect(screen.getByText("Science Top")).toBeInTheDocument();

  expect(screen.queryByText("Science Second")).not.toBeInTheDocument();

  expect(screen.getByText("Technology Top")).toBeInTheDocument();

  expect(document.querySelectorAll(".trending-item")).toHaveLength(2);
});
