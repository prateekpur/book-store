"use client";
import { useEffect, useState } from "react";
import BooksRow from "./book";
import AddBook from "./bookadd";
import { Book } from "@/app/lib/definitions";

export default function Page() {
  const [booksArr, setBooksArr] = useState([]);

  const handleSubmit = async () => {
    const result = await fetch("http://localhost:5001");
    setBooksArr(await result.json());
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
