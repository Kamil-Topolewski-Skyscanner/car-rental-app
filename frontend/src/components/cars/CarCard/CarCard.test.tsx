import { render, screen, fireEvent } from '@testing-library/react';
import { CarType } from '../../../services';
import { CarCard } from '../CarCard/CarCard';

const mockCar = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  type: CarType.SEDAN,
  pricePerDay: 50.00,
  isAvailable: true,
};

describe('CarCard', () => {
  it('renders car details correctly', () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText(CarType.SEDAN)).toBeInTheDocument();
    expect(screen.getByText('$50.00/day')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('shows unavailable status when car is not available', () => {
    const unavailableCar = { ...mockCar, isAvailable: false };
    render(<CarCard car={unavailableCar} />);

    expect(screen.getByText('Currently unavailable')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<CarCard car={mockCar} onClick={handleClick} />);

    fireEvent.click(screen.getByText('Toyota Camry'));
    expect(handleClick).toHaveBeenCalledWith(mockCar);
  });

  it('displays placeholder image when no image URL provided', () => {
    render(<CarCard car={mockCar} />);

    const image = screen.getByAltText('Toyota Camry');
    expect(image).toHaveAttribute('src', '/images/cars/sedan-placeholder.jpg');
  });

  it('displays provided image when URL exists', () => {
    const carWithImage = { ...mockCar, imageUrl: 'https://example.com/car.jpg' };
    render(<CarCard car={carWithImage} />);

    const image = screen.getByAltText('Toyota Camry');
    expect(image).toHaveAttribute('src', 'https://example.com/car.jpg');
  });
});
