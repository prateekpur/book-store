import { Book } from './definitions';

export async function fetchAllBooks(): Promise<Book[]> {
  try {
    const response = await fetch('http://localhost:5001/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const books: Book[] = await response.json();
    return books;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
