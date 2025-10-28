import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReservationProvider, useReservations } from '../context/ReservationContext';
import { ReservationService } from '../services';

// Mock the ReservationService
jest.mock('../services', () => ({
  ReservationService: {
    createReservation: jest.fn(),
    getReservationsByCustomerId: jest.fn(),
    cancelReservation: jest.fn(),
  }
}));

// Test component that uses the reservations context
const TestComponent = () => {
  const {
    reservations,
    loading,
    error,
    createReservation,
    fetchReservationsByCustomerId
  } = useReservations();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => fetchReservationsByCustomerId('test-customer-id')}>
        Fetch Reservations
      </button>
      {reservations.map(reservation => (
        <div key={reservation.id}>
          Reservation: {reservation.customerId} - {reservation.reservationStartDate}
        </div>
      ))}
    </div>
  );
};

describe('Reservation Service Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches reservations successfully', async () => {
    const mockReservations = [
      {
        id: 1,
        customerId: 'test-customer-id',
        carId: 'car-1',
        reservationStartDate: '2025-11-01T12:00:00',
        reservationEndDate: '2025-11-05T12:00:00',
        duration: 4,
        price: 200,
        createdAt: '2025-10-28T10:00:00',
        updatedAt: '2025-10-28T10:00:00'
      },
      {
        id: 2,
        customerId: 'test-customer-id',
        carId: 'car-2',
        reservationStartDate: '2025-12-01T12:00:00',
        reservationEndDate: '2025-12-05T12:00:00',
        duration: 4,
        price: 300,
        createdAt: '2025-10-28T10:00:00',
        updatedAt: '2025-10-28T10:00:00'
      }
    ];

    (ReservationService.getReservationsByCustomerId as jest.Mock).mockResolvedValue(mockReservations);

    render(
      <ReservationProvider>
        <TestComponent />
      </ReservationProvider>
    );

    fireEvent.click(screen.getByText('Fetch Reservations'));

    await waitFor(() => {
      expect(screen.getByText(/2025-11-01/)).toBeInTheDocument();
      expect(screen.getByText(/2025-12-01/)).toBeInTheDocument();
    });
  });

  it('handles reservation errors gracefully', async () => {
    const error = new Error('Failed to fetch reservations');
    (ReservationService.getReservationsByCustomerId as jest.Mock).mockRejectedValue(error);

    render(
      <ReservationProvider>
        <TestComponent />
      </ReservationProvider>
    );

    fireEvent.click(screen.getByText('Fetch Reservations'));

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch reservations')).toBeInTheDocument();
    });
  });
});
