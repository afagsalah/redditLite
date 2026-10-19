import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getComments } from "../../api/lemmyApi";

// Async action for getting comments from Lemmy
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const comments = await getComments(postId);
    return comments;
  },
);

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })

      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load comments";
      });
  },
});

export const selectComments = (state) => state.comments.comments;

export const selectCommentsLoading = (state) => state.comments.loading;

export const selectCommentsError = (state) => state.comments.error;

export default commentsSlice.reducer;
