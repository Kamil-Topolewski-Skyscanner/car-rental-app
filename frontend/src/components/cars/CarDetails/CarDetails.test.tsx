import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CarService } from '../../../services';
import { CarDetails } from './CarDetails';

// Mock CarService
jest.mock('../../../services', () => ({
  CarService: {
    checkCarAvailability: jest.fn()
  }
}));

const mockCar = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  type: 'SEDAN',
  pricePerDay: 50.00,
  isAvailable: true,
};

describe('CarDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (CarService.checkCarAvailability as jest.Mock).mockResolvedValue(true);
  });

  it('renders car information correctly', () => {
    render(<CarDetails car={mockCar} onReserve={jest.fn()} />);

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('SEDAN')).toBeInTheDocument();
    expect(screen.getByText('$50.00 /day')).toBeInTheDocument();
    expect(screen.getByText('Year: 2023')).toBeInTheDocument();
  });

  it('checks availability when dates are selected', async () => {
    const startDate = new Date('2025-11-01');
    const endDate = new Date('2025-11-05');

    render(<CarDetails car={mockCar} onReserve={jest.fn()} />);

    // Simulate date selection
    // Note: Calendar component integration will need its own tests
    await waitFor(() => {
      expect(CarService.checkCarAvailability).toHaveBeenCalledWith(
        mockCar.id,
        startDate.toISOString(),
        endDate.toISOString()
      );
    });
  });

  it('calculates total price correctly', async () => {
    const startDate = new Date('2025-11-01');
    const endDate = new Date('2025-11-05');

    render(<CarDetails car={mockCar} onReserve={jest.fn()} />);

    // Simulate date selection
    // 5 days * $50 per day = $250
    await waitFor(() => {
      expect(screen.getByText('Total Price: $250.00')).toBeInTheDocument();
    });
  });

  it('calls onReserve with selected dates', () => {
    const handleReserve = jest.fn();
    render(<CarDetails car={mockCar} onReserve={handleReserve} />);

    const reserveButton = screen.getByText('Reserve Now');
    fireEvent.click(reserveButton);

    expect(handleReserve).toHaveBeenCalled();
  });

  it('disables reserve button when car is not available', async () => {
    (CarService.checkCarAvailability as jest.Mock).mockResolvedValue(false);

    render(<CarDetails car={mockCar} onReserve={jest.fn()} />);

    await waitFor(() => {
      const button = screen.getByText('Not Available');
      expect(button).toBeDisabled();
    });
  });
});
