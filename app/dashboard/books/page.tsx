'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/state/store';
import { fetchBooks } from '@/app/state/bookSlice';
import { useAppDispatch } from '@/app/state/state-hooks';
import { Book } from '../../types';
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
