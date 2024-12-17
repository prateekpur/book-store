'use client';

import { FormEvent, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
          style={{ width: '300px', height: '40px' }}
          className="w-full p-2 border rounded"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          style={{ width: '300px', height: '40px' }}
          value={description}
          className="w-full p-2 border rounded"
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
