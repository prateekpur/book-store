import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Book } from '../types';

const initialState: Book[] = [];
const API_URL = 'http://localhost:3000/book';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get<Book[]>(API_URL);
  return response.data;
});

export const addBook = createAsyncThunk(
  'books/addBook',
  async (newBook: Omit<Book, 'id'>) => {
    await axios.post<Book>(API_URL, newBook);
    const response_fetch = await axios.get<Book[]>(API_URL);
    return response_fetch.data;
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async (updatedBook: Book) => {
    const response = await axios.put<Book>(
      `${API_URL}/${updatedBook.id}`,
      updatedBook
    );
    return updatedBook;
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state = action.payload;
        return state;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state = action.payload;
        return state;
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
        return state;
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state = state.filter((book) => book.id !== action.payload);
        return state;
      });
  },
});

export default booksSlice.reducer;
