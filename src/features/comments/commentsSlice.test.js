import { configureStore } from "@reduxjs/toolkit";

import commentsReducer, { fetchComments } from "./commentsSlice";

import { getComments } from "../../api/lemmyApi";

jest.mock("../../api/lemmyApi");

function createTestStore() {
  return configureStore({
    reducer: {
      comments: commentsReducer,
    },
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

// Test 1
test("has the correct initial state", () => {
  const store = createTestStore();

  expect(store.getState().comments).toEqual({
    comments: [],
    loading: false,
    error: null,
  });
});

// Test 2
test("fetchComments stores comments when API request succeeds", async () => {
  const mockComments = [
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
      body: "Very useful.",
      score: 5,
      time: "2 minutes ago",
    },
  ];

  getComments.mockResolvedValue(mockComments);

  const store = createTestStore();

  await store.dispatch(fetchComments(123));

  const state = store.getState().comments;

  expect(state.comments).toEqual(mockComments);

  expect(state.loading).toBe(false);

  expect(state.error).toBe(null);
});

// Test 3
test("fetchComments sends the post id to getComments", async () => {
  getComments.mockResolvedValue([]);

  const store = createTestStore();

  await store.dispatch(fetchComments(123));

  expect(getComments).toHaveBeenCalledWith(123);
});

// Test 4
test("fetchComments stores error when API request fails", async () => {
  getComments.mockRejectedValue(new Error("Failed to fetch comments"));

  const store = createTestStore();

  await store.dispatch(fetchComments(123));

  const state = store.getState().comments;

  expect(state.loading).toBe(false);

  expect(state.error).toBe("Failed to fetch comments");
});
