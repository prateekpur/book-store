// todo: this esint-disable should not be needed
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactRedux from 'react-redux';

import * as BookSlice from '@/app/state/bookSlice';
import AddBook from './addBook';
import BooksRow from './bookRow';
import { Book } from '@/app/types';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Button component', () => {
  it('renders with correct label', () => {
    render(<AddBook />);
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Add Book')).toBeInTheDocument();
  });

  it('invokes useDispatch and addBook when add button is clicked', async () => {
    const mockDispatch = jest.fn();
    const mockAddBook = jest.fn();
    const mockFetchBooks = jest.fn();
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(BookSlice, 'addBook').mockImplementation(mockAddBook);
    jest.spyOn(BookSlice, 'fetchBooks').mockImplementation(mockFetchBooks);
    render(<AddBook />);
    const textbox = screen.getAllByRole('textbox');
    await userEvent.type(textbox[0], 'Book Name');
    await userEvent.type(textbox[1], 'Book Description');
    const submitButton = screen.getByRole('button');
    await userEvent.click(submitButton);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockAddBook).toHaveBeenCalledTimes(1);
    expect(mockFetchBooks).toHaveBeenCalledTimes(1);
  });

  it('invokes useDispatch and updateBook when add button is clicked', async () => {
    const mockDispatch = jest.fn();
    const mockUpdateBook = jest.fn();
    const mockFetchBooks = jest.fn();
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(BookSlice, 'updateBook').mockImplementation(mockUpdateBook);
    jest.spyOn(BookSlice, 'fetchBooks').mockImplementation(mockFetchBooks);
    const book = { id: '1', name: '1', description: '1' };
    render(<BooksRow key={book.id} book={book} />);
    const editButton = screen.getAllByText('Edit');
    await userEvent.click(editButton[0]);
    const textbox = screen.getAllByRole('textbox');
    await userEvent.type(textbox[0], 'Updated Book Name');
    await userEvent.type(textbox[1], 'Updated Book Description');
    const saveButton = screen.getAllByText('Save');
    await userEvent.click(saveButton[0]);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockUpdateBook).toHaveBeenCalledTimes(1);
    expect(mockFetchBooks).toHaveBeenCalledTimes(1);
  });

  it('invokes useDispatch and deleteBook when add button is clicked', async () => {
    const mockDispatch = jest.fn();
    const mockDeleteBook = jest.fn();
    const mockFetchBooks = jest.fn();
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(BookSlice, 'deleteBook').mockImplementation(mockDeleteBook);
    jest.spyOn(BookSlice, 'fetchBooks').mockImplementation(mockFetchBooks);
    const book = { id: '1', name: '1', description: '1' };
    render(<BooksRow key={book.id} book={book} />);
    const deleteButton = screen.getAllByText('Delete');
    await userEvent.click(deleteButton[0]);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDeleteBook).toHaveBeenCalledTimes(1);
    expect(mockFetchBooks).toHaveBeenCalledTimes(1);
  });
});
