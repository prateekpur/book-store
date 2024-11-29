import { Book } from "@/app/lib/definitions";
import BooksRow from "./book";

export default function BookTable({ books }: { books: Book[] }) {
  return (
    <div>
      {books?.map((book) => (
        <BooksRow book={book} />
      ))}
    </div>
  );
}
