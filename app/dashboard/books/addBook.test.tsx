// todo: this esint-disable should not be needed
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import AddBook from './addBook';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Button component', () => {
  it('renders with correct label', () => {
    const { getByText } = render(<AddBook />);
    expect(getByText('Add New Item')).toBeInTheDocument();
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Add Book')).toBeInTheDocument();
  });
});
