import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../lib/definitions";
import axios from "axios";

const initialState: Book[] = [{ id: "1", name: "1", description: "1" }];
const API_URL = "http://localhost:5001";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get<Book[]>(API_URL);
  return response.data;
});

export const addBook = createAsyncThunk("books/addBook", async (newBook: Omit<Book, "id">) => {
  const response = await axios.post<Book>(API_URL, newBook);
  return response.data;
});

export const updateBook = createAsyncThunk("books/updateBook", async (updatedPost: Book) => {
  const response = await axios.put<Book>(`${API_URL}/${updatedPost.id}`, updatedPost);
  return response.data;
});

export const deleteBook = createAsyncThunk("books/deleteBook", async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {})
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {})
      // Add post
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.push(action.payload);
      })
      // Update post
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      // Delete post
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state = state.filter((book) => book.id !== action.payload);
      });
  },
});
export default booksSlice.reducer;
