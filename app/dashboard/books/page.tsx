"use client";
import { useEffect, useState } from "react";
import BooksRow from "./book";
import AddBook from "./bookadd";
import { Book } from "@/app/lib/definitions";
import { Provider, useSelector } from "react-redux";
import { store } from "@/app/store";
import { RootState, AppDispatch } from "../../../app/store";

export default function Page() {
  const [booksArr, setBooksArr] = useState([]);
  //const { books } = useSelector((state: RootState) => state);

  const handleSubmit = async () => {
    console.log("Page on change");
    const result = await fetch("http://localhost:5001");
    const data = await result.json();
    setBooksArr(data);
    console.log("Array after update : " + JSON.stringify(data));
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Provider store={store}>
      <div>
        {booksArr?.map((book: Book) => (
          <BooksRow key={book.id} onChange={handleSubmit} book={book} />
        ))}
        <div>
          <AddBook onChange={handleSubmit}></AddBook>
        </div>
      </div>
    </Provider>
  );
}
