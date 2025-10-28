import { FC, useEffect, useState } from 'react';
import { useCars } from '../../context/CarsContext';
import CarList from '../cars/CarList';
import { ReservationModal } from '../reservation/ReservationModal';
import { Car } from '@services/index';

export const CarListPage: FC = () => {
  const { cars, loading, error, fetchCars } = useCars();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    console.log('Fetching cars...');
    fetchCars();
  }, [fetchCars]);

  const handleCarSelect = (car: Car) => {
    console.log('Selected car:', car);
    // TODO: Implement car selection handling
  };

  const handleCarReserve = (car: Car) => {
    setSelectedCar(car);
  };

  const handleModalClose = () => {
    setSelectedCar(null);
  };

  const handleReservationSuccess = () => {
    setSelectedCar(null);
    // Refresh the car list to update availability
    fetchCars();
  };

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <CarList
        cars={cars}
        onCarSelect={handleCarSelect}
        onCarReserve={handleCarReserve}
      />
      {selectedCar && (
        <ReservationModal
          car={selectedCar}
          onClose={handleModalClose}
          onSuccess={handleReservationSuccess}
        />
      )}
    </>
  );
};
