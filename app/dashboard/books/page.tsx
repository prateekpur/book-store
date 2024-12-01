"use client";
import { useEffect, useState } from "react";
import BooksRow from "./book";
import AddBook from "./bookadd";
import { Book } from "@/app/lib/definitions";
import { Provider, useSelector } from "react-redux";
import { fetchAllBooks } from "@/app/lib/data";
import { useReducer } from "react";
import { useAppDispatch } from "../../hooks";
import { fetchBooks } from "@/app/features/bookSlice";

export default function Page() {
  const booksArr = useSelector((state: { books: Book[] }) => {
    console.log(state);
    return state.books;
  });
  console.log("Books Page", booksArr);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    console.log(" Books page before fetch");
    dispatch(fetchBooks());
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      {booksArr?.map((book: Book) => (
        <BooksRow key={book.id} onChange={handleSubmit} book={book} />
      ))}
      <div>
        <AddBook onChange={handleSubmit}></AddBook>
      </div>
    </div>
  );
}
