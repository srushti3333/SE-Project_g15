// src/pages/OrderOptions/OrderOptions.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderOptionsModal from './OrderOptions';
import * as groupApi from '../../api/groups';
import * as orderApi from '../../api/orders';
import { useCart } from '../../context/CartContext';
jest.mock('../../context/CartContext');
jest.mock('../../api/groups');
jest.mock('../../api/orders');


describe('OrderOptionsModal', () => {
  beforeEach(() => {
    useCart.mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
  });

  test('renders title and buttons correctly', () => {
    render(
      <MemoryRouter>
        <OrderOptionsModal />
      </MemoryRouter>
    );

    expect(screen.getByText(/order options/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('calls API when submitting an order', async () => {
    orderApi.createOrder.mockResolvedValueOnce({ id: 1 });

    render(
      <MemoryRouter>
        <OrderOptionsModal />
      </MemoryRouter>
    );

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(orderApi.createOrder).toHaveBeenCalled();
    });
  });

  test('closes modal on cancel', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <OrderOptionsModal />
      </MemoryRouter>
    );

    const cancelButton = getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Assuming your modal unmounts or hides
    expect(cancelButton).not.toBeInTheDocument();
  });
  test('loads and displays group options', async () => {
  groupApi.getGroups.mockResolvedValueOnce([
    { id: 1, name: 'Friends' },
    { id: 2, name: 'Family' },
  ]);

  render(
    <MemoryRouter>
      <OrderOptionsModal />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Friends')).toBeInTheDocument();
    expect(screen.getByText('Family')).toBeInTheDocument();
  });
});

test('handles API error gracefully', async () => {
  orderApi.createOrder.mockRejectedValueOnce(new Error('Network error'));

  render(
    <MemoryRouter>
      <OrderOptionsModal />
    </MemoryRouter>
  );

  const confirmButton = screen.getByRole('button', { name: /confirm/i });
  fireEvent.click(confirmButton);

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});

test('updates selection and re-renders summary', async () => {
  groupApi.getGroups.mockResolvedValueOnce([{ id: 1, name: 'Test Group' }]);

  render(
    <MemoryRouter>
      <OrderOptionsModal />
    </MemoryRouter>
  );

  // Wait for groups to load
  await waitFor(() => screen.getByText('Test Group'));

  // Example: simulate dropdown or radio change
  const groupOption = screen.getByText('Test Group');
  fireEvent.click(groupOption);

  expect(screen.getByText(/summary/i)).toBeInTheDocument();
});

});