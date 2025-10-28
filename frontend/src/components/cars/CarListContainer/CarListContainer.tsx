import { FC, useEffect } from 'react';
import { Car } from '@services/index';
import { useCars } from '../../../context/CarsContext';
import { CarList } from '../CarList/CarList';

interface CarListContainerProps {
  onCarSelect: (car: Car) => void;
}

export const CarListContainer: FC<CarListContainerProps> = ({ onCarSelect }) => {
  const { cars, loading, error, fetchCars } = useCars();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <CarList cars={cars} onCarSelect={onCarSelect} />;
};
