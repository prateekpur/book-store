// todo: this esint-disable should not be needed
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactRedux from 'react-redux';

import * as BookSlice from '@/app/state/bookSlice';
import AddBook from './addBook';

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
});
