import { FC } from 'react';
import { Car } from '../../../services';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
  onClick?: (car: Car) => void;
}

export const CarCard: FC<CarCardProps> = ({ car, onClick }) => {
  const { make, model, year, type, pricePerDay, isAvailable, imageUrl } = car;

  const handleClick = () => {
    onClick?.(car);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={imageUrl || `/images/cars/${type.toLowerCase()}-placeholder.jpg`}
        alt={`${make} ${model}`}
        className={styles.image}
      />
      <div className={styles.details}>
        <div className={styles.header}>
          <h3 className={styles.title}>{`${make} ${model}`}</h3>
          <span className={styles.type}>{type}</span>
        </div>
        <div className={styles.specs}>
          <span>{year}</span>
          <span>•</span>
          <span>{type}</span>
        </div>
        <div className={styles.price}>
          ${pricePerDay.toFixed(2)}/day
        </div>
        <div className={`${styles.availability} ${!isAvailable ? styles.unavailable : ''}`}>
          {isAvailable ? 'Available' : 'Currently unavailable'}
        </div>
      </div>
    </div>
  );
};
