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

describe('Add Book component', () => {
  const mockDispatch = jest.fn();
  const mockAddBook = jest.fn();
  const mockFetchBooks = jest.fn();

  beforeAll(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(BookSlice, 'addBook').mockImplementation(mockAddBook);
    jest.spyOn(BookSlice, 'fetchBooks').mockImplementation(mockFetchBooks);
  });

  beforeEach(() => {
    render(<AddBook />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct label', () => {
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Add Book')).toBeInTheDocument();
  });

  it('invokes useDispatch and addBook when add button is clicked', async () => {
    const textbox = screen.getAllByRole('textbox');
    await userEvent.type(textbox[0], 'Book Name');
    await userEvent.type(textbox[1], 'Book Description');
    const submitButton = screen.getByRole('button');
    await userEvent.click(submitButton);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockAddBook).toHaveBeenCalledTimes(1);
    expect(mockFetchBooks).toHaveBeenCalledTimes(1);
  });

  it('does not invoke useDispatch and addBook when add button is clicked with empty name and title', async () => {
    const submitButton = screen.getByRole('button');
    await userEvent.click(submitButton);
    expect(mockDispatch).toHaveBeenCalledTimes(0);
    expect(mockAddBook).toHaveBeenCalledTimes(0);
    expect(mockFetchBooks).toHaveBeenCalledTimes(0);
  });
});
