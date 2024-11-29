"use client";
import { useEffect, useState } from "react";
import BooksRow from "./book";
import AddBook from "./bookadd";

export default function Page() {
  const [booksArr, setBooksArr] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetch("http://localhost:5001");
      setBooksArr(await result.json());
    })();
  }, []); // Dependency array is empty, so this runs only once.

  return (
    <div>
      {booksArr?.map((book) => (
        <BooksRow book={book} />
      ))}
      <div>
        <AddBook books={booksArr}></AddBook>
      </div>
    </div>
  );
}
