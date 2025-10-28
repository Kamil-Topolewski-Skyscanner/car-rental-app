import { render, screen, fireEvent } from '@testing-library/react';
import { CarType } from '../../../services';
import { CarList } from './CarList';

const mockCars = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    type: CarType.SEDAN,
    pricePerDay: 50.00,
    isAvailable: true,
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    type: CarType.SUV,
    pricePerDay: 70.00,
    isAvailable: true,
  },
];

describe('CarList', () => {
  it('renders all cars by default', () => {
    render(<CarList cars={mockCars} onCarSelect={jest.fn()} />);

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('Honda CR-V')).toBeInTheDocument();
  });

  it('filters cars by type', () => {
    render(<CarList cars={mockCars} onCarSelect={jest.fn()} />);

    fireEvent.click(screen.getByText(CarType.SEDAN));
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.queryByText('Honda CR-V')).not.toBeInTheDocument();
  });

  it('filters cars by search query', () => {
    render(<CarList cars={mockCars} onCarSelect={jest.fn()} />);

    const searchInput = screen.getByPlaceholderText('Search by make or model...');
    fireEvent.change(searchInput, { target: { value: 'toyota' } });

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.queryByText('Honda CR-V')).not.toBeInTheDocument();
  });

  it('calls onCarSelect when a car is clicked', () => {
    const handleSelect = jest.fn();
    render(<CarList cars={mockCars} onCarSelect={handleSelect} />);

    fireEvent.click(screen.getByText('Toyota Camry'));
    expect(handleSelect).toHaveBeenCalledWith(mockCars[0]);
  });

  it('shows no results message when no cars match filters', () => {
    render(<CarList cars={mockCars} onCarSelect={jest.fn()} />);

    const searchInput = screen.getByPlaceholderText('Search by make or model...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No cars found matching your criteria')).toBeInTheDocument();
  });
});
