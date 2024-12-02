/* eslint-disable no-undef */

'use client';
import { useState } from 'react';
import { Book } from '@/app/lib/definitions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { updateBook, deleteBook } from '@/app/features/bookSlice';

export default function BooksRow({
  onChange,
  book,
}: {
  onChange: () => void;
  book: Book;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(book.name);
  const [description, setDescription] = useState(book.description);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);

  const onEdit = () => {
    setEditing(true);
  };

  const handleDelete = async () => {
    dispatch(deleteBook(book.id)).catch((error) =>
      console.error('Failed to delete the book:', error)
    );
    onChange();
  };

  const handleUpdate = async () => {
    setName(editName);
    setDescription(editDescription);

    dispatch(
      updateBook({ id: book.id, name: editName, description: editDescription })
    );
    onChange();
    setEditing(false);
  };

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
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  ></input>
                  <input
                    type="textbox"
                    className="w-full p-2 border rounded"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  ></input>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={handleUpdate}
                  >
                    {' '}
                    Save{' '}
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
