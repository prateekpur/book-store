'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Book } from '../../lib/definitions';
import { RootState } from '../../store';
import { fetchBooks } from '../../features/bookSlice';
import { useAppDispatch } from '../../hooks';

import AddBook from './addBook';
import BooksRow from './book';

export default function Page() {
  const bookArray = useSelector((state: RootState) => state.books);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(fetchBooks());
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      {bookArray?.map((book: Book) => (
        <BooksRow key={book.id} onChange={handleSubmit} book={book} />
      ))}
      <div>
        <AddBook onChange={handleSubmit}></AddBook>
      </div>
    </div>
  );
}
