'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Book } from '@/app/types';
import { RootState } from '@/app/state/store';
import { fetchBooks } from '@/app/state/bookSlice';
import { useAppDispatch } from '@/app/state/state-hooks';
import AddBook from './addBook';
import BooksRow from './bookRow';

export default function Page() {
  const bookList = useSelector((state: RootState) => state.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);
  console.log('Books list :', bookList);

  return (
    <div>
      {bookList?.map((book: Book) => <BooksRow key={book.id} book={book} />)}
      <div>
        <AddBook />
      </div>
    </div>
  );
}
