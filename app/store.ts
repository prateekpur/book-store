import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/bookSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

// Infer RootState and AppDispatch types for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
