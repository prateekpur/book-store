'use client';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/state/store';
import { Book } from '@/app/types';
import { updateBook, deleteBook, fetchBooks } from '@/app/state/bookSlice';

export default function BooksRow({ book }: { book: Book }) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(book.name);
  const [description, setDescription] = useState(book.description);
  const [editing, setEditing] = useState(false);

  const onEdit = () => {
    setEditing(true);
  };

  const handleDelete = useCallback(() => {
    dispatch(deleteBook(book.id));
    dispatch(fetchBooks());
  }, [dispatch, book.id]);

  const handleUpdate = useCallback(() => {
    dispatch(updateBook({ id: book.id, name, description }));
    dispatch(fetchBooks());
    setEditing(false);
  }, [dispatch, book.id, name, description]);

  return (
    <div>
      <div key={book.id} className="mb-2 w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="mb-2 flex items-center">
            <div className="flex items-center gap-3">
              {editing ? (
                <div className="space-y-2">
                  <h3 className="font-semibold">{book.id}</h3>
                  <input
                    type="textbox"
                    className="w-full p-2 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <input
                    type="textbox"
                    className="w-full p-2 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-semibold">{book.id}</h3>
                  <p className="text-gray-600">{book.name}</p>
                  <p className="text-gray-600">{book.description}</p>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={onEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
