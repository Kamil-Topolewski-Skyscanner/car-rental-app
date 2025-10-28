import { render, screen, waitFor } from '@testing-library/react';
import { CarsProvider, useCars } from '../context/CarsContext';
import { CarService } from '../services';

// Mock the CarService
jest.mock('../services', () => ({
  CarService: {
    getAllCars: jest.fn(),
    getCarsByType: jest.fn(),
    checkCarAvailability: jest.fn(),
  }
}));

// Test component that uses the cars context
const TestComponent = () => {
  const { cars, loading, error, fetchCars } = useCars();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={fetchCars}>Fetch Cars</button>
      {cars.map(car => (
        <div key={car.id}>{car.make} {car.model}</div>
      ))}
    </div>
  );
};

describe('Car Service Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches cars successfully', async () => {
    const mockCars = [
      { id: '1', make: 'Toyota', model: 'Camry' },
      { id: '2', make: 'Honda', model: 'Civic' },
    ];

    (CarService.getAllCars as jest.Mock).mockResolvedValue(mockCars);

    render(
      <CarsProvider>
        <TestComponent />
      </CarsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
      expect(screen.getByText('Honda Civic')).toBeInTheDocument();
    });
  });

  it('handles fetch errors gracefully', async () => {
    const error = new Error('Failed to fetch cars');
    (CarService.getAllCars as jest.Mock).mockRejectedValue(error);

    render(
      <CarsProvider>
        <TestComponent />
      </CarsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch cars')).toBeInTheDocument();
    });
  });
});
