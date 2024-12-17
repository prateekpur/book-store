'use client';

import { FormEvent, useCallback, useState } from 'react';

import { useAppDispatch } from '@/app/state/state-hooks';
import { addBook, fetchBooks } from '@/app/state/bookSlice';

export default function AddBook() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const book = { title: name, description };
      dispatch(addBook(book));
      dispatch(fetchBooks());
      setDescription('');
      setName('');
    },
    [dispatch, name, description, setDescription, setName]
  );

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={name}
          className="w-full p-2 border rounded  w-10 h-10 sm:w-20 sm:h-10 md:w-30 md:h-10 lg:w-40 lg:h-10"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          value={description}
          className="w-full p-2 border rounded  w-10 h-10 sm:w-20 sm:h-20 md:w-30 md:h-30 lg:w-40 lg:h-60"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Book
      </button>
    </form>
  );
}
