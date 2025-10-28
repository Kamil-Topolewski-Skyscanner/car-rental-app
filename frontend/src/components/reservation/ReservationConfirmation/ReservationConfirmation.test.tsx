import { render, screen, fireEvent } from '@testing-library/react';
import { ReservationConfirmation } from './ReservationConfirmation';

const mockReservation = {
  id: 1,
  customerId: 'test@example.com',
  carId: 'car-1',
  reservationStartDate: '2025-12-17T12:00:00',
  reservationEndDate: '2025-12-20T12:00:00',
  duration: 3,
  price: 150.00,
  createdAt: '2025-10-28T10:00:00',
  updatedAt: '2025-10-28T10:00:00'
};

describe('ReservationConfirmation', () => {
  it('displays all reservation details correctly', () => {
    const onClose = jest.fn();
    render(
      <ReservationConfirmation
        reservation={mockReservation}
        onClose={onClose}
      />
    );

    // Check if all important information is displayed
    expect(screen.getByText(/Reservation Complete!/i)).toBeInTheDocument();
    expect(screen.getByText(/Reservation ID:/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3 days')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
  });

  it('calls onClose when clicking the close button', () => {
    const onClose = jest.fn();
    render(
      <ReservationConfirmation
        reservation={mockReservation}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByText('Done'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the modal', () => {
    const onClose = jest.fn();
    const { container } = render(
      <ReservationConfirmation
        reservation={mockReservation}
        onClose={onClose}
      />
    );

    // Click the overlay (parent of the modal)
    fireEvent.click(container.firstChild as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
