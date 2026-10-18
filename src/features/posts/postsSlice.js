import { createSlice } from "@reduxjs/toolkit";
import { postsData } from "../../data/postsData";

const initialState = {
  posts: postsData,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
