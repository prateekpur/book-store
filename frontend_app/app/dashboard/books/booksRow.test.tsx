// todo: this esint-disable should not be needed
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactRedux from 'react-redux';

import * as BookSlice from '@/app/state/bookSlice';
import BooksRow from './bookRow';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const book = { id: '1', title: '1', description: '1' };
const mockUpdateBook = jest.fn();
const mockDeleteBook = jest.fn();
const mockDispatch = jest.fn();

beforeAll(() => {
  jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch);
  jest.spyOn(BookSlice, 'updateBook').mockImplementation(mockUpdateBook);
  jest.spyOn(BookSlice, 'deleteBook').mockImplementation(mockDeleteBook);
});

beforeEach(() => {
  render(<BooksRow key={book.id} book={book} />);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('BooksRow component', () => {
  it('invokes useDispatch and updateBook when book is updated', async () => {
    const editButton = screen.getAllByText('Edit');
    await userEvent.click(editButton[0]);
    const textbox = screen.getAllByRole('textbox');
    await userEvent.type(textbox[0], 'Updated Book Name');
    await userEvent.type(textbox[1], 'Updated Book Description');
    const saveButton = screen.getAllByText('Save');
    await userEvent.click(saveButton[0]);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockUpdateBook).toHaveBeenCalledTimes(1);
  });

  it('invokes useDispatch and deleteBook when delete button is clicked', async () => {
    const deleteButton = screen.getAllByText('Delete');
    await userEvent.click(deleteButton[0]);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDeleteBook).toHaveBeenCalledTimes(1);
  });
});
