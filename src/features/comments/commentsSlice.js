import { createSlice } from "@reduxjs/toolkit";
import { commentsData } from "../../data/commentsData";

const initialState = {
  comments: commentsData,
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
});

export const selectComments = (state) => state.comments.comments;

export const selectCommentsLoading = (state) => state.comments.loading;

export const selectCommentsError = (state) => state.comments.error;

export default commentsSlice.reducer;
