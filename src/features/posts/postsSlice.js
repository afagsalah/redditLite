import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postsData } from "../../data/postsData";
import { getPosts } from "../../api/redditApi";
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (subreddit = "popular") => {
    const posts = await getPosts(subreddit);
    return posts;
  },
);

const initialState = {
  posts: postsData,
  loading: false,
  error: null,
  selectedSubreddit: "home",
  searchTerm: "",
  sortType: "hot",
};
const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSelectedSubreddit, setSearchTerm, setSortType } =
  postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectPostsError = (state) => state.posts.error;
export const selectSelectedSubreddit = (state) => state.posts.selectedSubreddit;
//search
export const selectSearchTerm = (state) => state.posts.searchTerm;
//sort
export const selectSortType = (state) => state.posts.sortType;

export default postsSlice.reducer;
