import { FC, useEffect } from 'react';
import { useCars } from '../../context/CarsContext';
import CarList from '../cars/CarList';
import { Car } from '@services/index';

export const CarListPage: FC = () => {
  const { cars, loading, error, fetchCars } = useCars();

  useEffect(() => {
    console.log('Fetching cars...');
    fetchCars();
  }, [fetchCars]);

  const handleCarSelect = (car: Car) => {
    console.log('Selected car:', car);
    // TODO: Implement car selection handling
  };

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <CarList cars={cars} onCarSelect={handleCarSelect} />;
};
