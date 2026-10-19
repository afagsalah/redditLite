import { configureStore } from "@reduxjs/toolkit";

import postsReducer, {
  setSelectedSubreddit,
  setSearchTerm,
  setSortType,
  upvotePost,
  downvotePost,
  fetchPosts,
} from "./postsSlice";

import { getPosts } from "../../api/lemmyApi";

jest.mock("../../api/lemmyApi");

// --------------------------------
// Helper
// --------------------------------

function createTestStore(preloadedState) {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },

    preloadedState: preloadedState
      ? {
          posts: preloadedState,
        }
      : undefined,
  });
}

// --------------------------------
// Test 1
// Initial state
// --------------------------------

test("has the correct initial state", () => {
  const store = createTestStore();

  expect(store.getState().posts).toEqual({
    posts: [],
    loading: false,
    error: null,
    selectedSubreddit: "home",
    searchTerm: "",
    sortType: "hot",
  });
});

// --------------------------------
// Test 2
// Selected subreddit
// --------------------------------

test("changes the selected subreddit", () => {
  const store = createTestStore();

  store.dispatch(setSelectedSubreddit("technology"));

  expect(store.getState().posts.selectedSubreddit).toBe("technology");
});

// --------------------------------
// Test 3
// Search term
// --------------------------------

test("changes the search term", () => {
  const store = createTestStore();

  store.dispatch(setSearchTerm("React"));

  expect(store.getState().posts.searchTerm).toBe("React");
});

// --------------------------------
// Test 4
// Sort type
// --------------------------------

test("changes the sort type", () => {
  const store = createTestStore();

  store.dispatch(setSortType("new"));

  expect(store.getState().posts.sortType).toBe("new");
});

// --------------------------------
// Test 5
// Upvote
// --------------------------------

test("increases post score when upvoted", () => {
  const store = createTestStore({
    posts: [
      {
        id: 1,
        title: "Test Post",
        score: 10,
      },
    ],

    loading: false,
    error: null,
    selectedSubreddit: "home",
    searchTerm: "",
    sortType: "hot",
  });

  store.dispatch(upvotePost(1));

  expect(store.getState().posts.posts[0].score).toBe(11);
});

// --------------------------------
// Test 6
// Downvote
// --------------------------------

test("decreases post score when downvoted", () => {
  const store = createTestStore({
    posts: [
      {
        id: 1,
        title: "Test Post",
        score: 10,
      },
    ],

    loading: false,
    error: null,
    selectedSubreddit: "home",
    searchTerm: "",
    sortType: "hot",
  });

  store.dispatch(downvotePost(1));

  expect(store.getState().posts.posts[0].score).toBe(9);
});

// --------------------------------
// Test 7
// fetchPosts successful
// --------------------------------

test("fetchPosts stores posts when API request succeeds", async () => {
  const mockPosts = [
    {
      id: 1,
      title: "React Post",
      score: 100,
    },

    {
      id: 2,
      title: "JavaScript Post",
      score: 200,
    },
  ];

  getPosts.mockResolvedValue(mockPosts);

  const store = createTestStore();

  await store.dispatch(
    fetchPosts({
      community: "programming",
      sort: "Hot",
    }),
  );

  const state = store.getState().posts;

  expect(state.posts).toEqual(mockPosts);

  expect(state.loading).toBe(false);

  expect(state.error).toBe(null);
});

// --------------------------------
// Test 8
// Check API arguments
// --------------------------------

test("fetchPosts sends community and sort to getPosts", async () => {
  getPosts.mockResolvedValue([]);

  const store = createTestStore();

  await store.dispatch(
    fetchPosts({
      community: "technology",
      sort: "New",
    }),
  );

  expect(getPosts).toHaveBeenCalledWith("technology", "New");
});

// --------------------------------
// Test 9
// fetchPosts error
// --------------------------------

test("fetchPosts stores error when API request fails", async () => {
  getPosts.mockRejectedValue(new Error("Failed to fetch posts"));

  const store = createTestStore();

  await store.dispatch(
    fetchPosts({
      community: "home",
      sort: "Hot",
    }),
  );

  const state = store.getState().posts;

  expect(state.loading).toBe(false);

  expect(state.error).toBe("Failed to fetch posts");
});
