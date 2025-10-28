import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReservationProvider, useReservations } from '../context/ReservationContext';
import { ReservationService } from '../services';

// Mock the ReservationService
jest.mock('../services', () => ({
  ReservationService: {
    createReservation: jest.fn(),
    getReservationsByEmail: jest.fn(),
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
    fetchReservationsByEmail
  } = useReservations();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => fetchReservationsByEmail('test@example.com')}>
        Fetch Reservations
      </button>
      {reservations.map(reservation => (
        <div key={reservation.id}>
          Reservation: {reservation.customerName} - {reservation.startDate}
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
        id: '1',
        customerName: 'John Doe',
        startDate: '2025-11-01',
        endDate: '2025-11-05',
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        startDate: '2025-12-01',
        endDate: '2025-12-05',
      },
    ];

    (ReservationService.getReservationsByEmail as jest.Mock).mockResolvedValue(mockReservations);

    render(
      <ReservationProvider>
        <TestComponent />
      </ReservationProvider>
    );

    fireEvent.click(screen.getByText('Fetch Reservations'));

    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    });
  });

  it('handles reservation errors gracefully', async () => {
    const error = new Error('Failed to fetch reservations');
    (ReservationService.getReservationsByEmail as jest.Mock).mockRejectedValue(error);

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
