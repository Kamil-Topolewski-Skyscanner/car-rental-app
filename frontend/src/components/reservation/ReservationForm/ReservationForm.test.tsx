import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReservationRequest } from '../../../services';
import { ReservationForm } from './ReservationForm';

const mockCar = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  type: 'SEDAN',
  pricePerDay: 50.00,
  isAvailable: true,
};

const mockDates = {
  startDate: new Date('2025-11-01'),
  endDate: new Date('2025-11-05'),
};

describe('ReservationForm', () => {
  it('renders all form fields correctly', () => {
    const handleSubmit = jest.fn();
    render(
      <ReservationForm
        car={mockCar}
        startDate={mockDates.startDate}
        endDate={mockDates.endDate}
        totalPrice={250}
        onSubmit={handleSubmit}
      />
    );

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('5 days')).toBeInTheDocument();
    expect(screen.getByText('$250.00')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const handleSubmit = jest.fn();
    render(
      <ReservationForm
        car={mockCar}
        startDate={mockDates.startDate}
        endDate={mockDates.endDate}
        totalPrice={250}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.click(screen.getByText('Confirm Reservation'));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    const handleSubmit = jest.fn();
    render(
      <ReservationForm
        car={mockCar}
        startDate={mockDates.startDate}
        endDate={mockDates.endDate}
        totalPrice={250}
        onSubmit={handleSubmit}
      />
    );

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Confirm Reservation'));

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const handleSubmit = jest.fn();
    render(
      <ReservationForm
        car={mockCar}
        startDate={mockDates.startDate}
        endDate={mockDates.endDate}
        totalPrice={250}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });

    fireEvent.click(screen.getByText('Confirm Reservation'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        carId: mockCar.id,
        startDate: mockDates.startDate.toISOString(),
        endDate: mockDates.endDate.toISOString(),
        customerName: 'John Doe',
        customerEmail: 'john@example.com'
      } as ReservationRequest);
    });
  });

  it('disables submit button while processing', async () => {
    const handleSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(
      <ReservationForm
        car={mockCar}
        startDate={mockDates.startDate}
        endDate={mockDates.endDate}
        totalPrice={250}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });

    fireEvent.click(screen.getByText('Confirm Reservation'));

    expect(screen.getByText('Processing...')).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('Confirm Reservation')).toBeInTheDocument();
    });
  });
});
