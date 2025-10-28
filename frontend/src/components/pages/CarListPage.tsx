import { FC, useEffect, useState } from 'react';
import { useCars } from '../../context/CarsContext';
import { useDateRange } from '../../context/DateRangeContext';
import CarList from '../cars/CarList';
import { DateRangePicker } from '../common/DateRangePicker/DateRangePicker';
import { ReservationModal } from '../reservation/ReservationModal/ReservationModal';
import { Car } from '@services/index';
import styles from './CarListPage.module.css';

const CarListPage: FC = () => {
  const { cars, loading, error, fetchCars } = useCars();
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange();
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
    <div className={styles.container}>
      <div className={styles.header}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <CarList
        cars={cars}
        onCarSelect={handleCarSelect}
        onCarReserve={handleCarReserve}
        startDate={startDate}
        endDate={endDate}
      />

      {selectedCar && (
        <ReservationModal
          car={selectedCar}
          onClose={handleModalClose}
          onSuccess={handleReservationSuccess}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
};

export default CarListPage;
