import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QnaPost } from "../lib/api/qna";

export interface QnaState {
  post: QnaPost | null;
  replies: QnaPost[] | null;
}

const initialState: QnaState = {
  post: null,
  replies: null,
};

const qna = createSlice({
  name: "qna",
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<QnaPost | null>) {
      state.post = action.payload;
    },
    setReplies(state, action: PayloadAction<QnaPost[]>) {
      state.replies = action.payload;
    },
    acceptReply(state, action: PayloadAction<number>) {
      const reply = state.replies?.find((reply) => reply.id === action.payload);
      if (reply) {
        reply.accepted = true;
      }
    },
    deleteReply(state, action: PayloadAction<number>) {
      if (!state.replies) {
        return;
      }
      const idx = state.replies?.findIndex(
        (reply) => reply.id === action.payload,
      );
      if (idx !== -1) {
        state.replies?.splice(idx, 1);
      }
    },
  },
});

export default qna;
