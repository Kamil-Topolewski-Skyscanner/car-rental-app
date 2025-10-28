import { FC, useState, useCallback } from 'react';
import { Car, CarService } from '../../../services';
import { Calendar } from '../../common/Calendar/Calendar';
import styles from './CarDetails.module.css';

interface CarDetailsProps {
  car: Car;
  onReserve: (startDate: Date, endDate: Date) => void;
}

export const CarDetails: FC<CarDetailsProps> = ({ car, onReserve }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(car.isAvailable);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const handleDateSelect = useCallback(async (start: Date | null, end: Date | null) => {
    if (start && end) {
      setStartDate(start);
      setEndDate(end);

      // Check availability for selected dates
      try {
        const available = await CarService.checkCarAvailability(
          car.id,
          start.toISOString(),
          end.toISOString()
        );
        setIsAvailable(available);

        // Calculate total price
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        setTotalPrice(days * car.pricePerDay);
      } catch (error) {
        console.error('Failed to check availability:', error);
        setIsAvailable(false);
      }
    } else {
      setStartDate(null);
      setEndDate(null);
      setTotalPrice(null);
    }
  }, [car]);

  const handleReserve = useCallback(() => {
    if (startDate && endDate) {
      onReserve(startDate, endDate);
    }
  }, [startDate, endDate, onReserve]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.mainInfo}>
          <h1 className={styles.title}>{`${car.make} ${car.model}`}</h1>
          <span className={styles.type}>{car.type}</span>
          <div className={styles.price}>
            ${car.pricePerDay.toFixed(2)} <span className={styles.priceUnit}>/day</span>
          </div>
        </div>
      </div>

      <div className={styles.imageSection}>
        <img
          src={car.imageUrl || `/images/cars/${car.type.toLowerCase()}-placeholder.jpg`}
          alt={`${car.make} ${car.model}`}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.specs}>
          <h2 className={styles.specTitle}>Specifications</h2>
          <div className={styles.specList}>
            <div className={styles.specItem}>Year: {car.year}</div>
            <div className={styles.specItem}>Type: {car.type}</div>
          </div>
        </div>

        <div className={styles.calendar}>
          <h2 className={styles.calendarTitle}>Select Rental Dates</h2>
          <Calendar
            onDateRangeSelect={handleDateSelect}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>

      <div className={styles.reservationSection}>
        {totalPrice && (
          <div className={styles.totalPrice}>
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        )}
        <button
          className={styles.actionButton}
          disabled={!isAvailable || !startDate || !endDate}
          onClick={handleReserve}
        >
          {!isAvailable ? 'Not Available' : 'Reserve Now'}
        </button>
      </div>
    </div>
  );
};
