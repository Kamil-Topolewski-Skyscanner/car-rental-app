import { FC } from 'react';
import { Car } from '../../../services';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
  onClick?: (car: Car) => void;
  onReserve?: (car: Car) => void;
}

export const CarCard: FC<CarCardProps> = ({ car, onClick, onReserve }) => {
  const { make, model, year, type, pricePerDay, isAvailable, imageUrl } = car;

  const handleClick = () => {
    onClick?.(car);
  };

  const handleReserve = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    onReserve?.(car);
  };

  const getCarImageUrl = () => {
    // Create a more specific URL for better image matching
    const params = new URLSearchParams({
      customer: 'hrjavascript-mastery',  // Using a public customer ID
      make: make,
      modelFamily: model,
      zoomType: 'fullscreen',
      modelYear: `${year}`,
      angle: '23'
    });

    // Add optional parameters for better image quality
    params.append('width', '800');
    params.append('height', '600');
    params.append('quality', '80');

    return `https://cdn.imagin.studio/getimage?${params.toString()}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const currentSrc = target.src;

    // If current source is already the Unsplash fallback, don't try again
    if (currentSrc.includes('unsplash.com')) {
      // Use a generic car image as final fallback
      target.src = 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&h=600&fit=crop';
      return;
    }

    // If imagin.studio failed, try with a different angle
    if (currentSrc.includes('imagin.studio')) {
      const newParams = new URLSearchParams(currentSrc.split('?')[1]);
      newParams.set('angle', '1'); // Try front view instead
      target.src = `https://cdn.imagin.studio/getimage?${newParams.toString()}`;
      return;
    }

    // If all else fails, try Unsplash with make and model
    target.src = `https://source.unsplash.com/800x600/?${make}+${model}+car`;
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={imageUrl || getCarImageUrl()}
        alt={`${make} ${model}`}
        className={styles.image}
        onError={handleImageError}
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
        <button
          className={`${styles.reserveButton} ${!isAvailable ? styles.disabled : ''}`}
          onClick={handleReserve}
          disabled={!isAvailable}
          aria-label={`Reserve ${make} ${model}`}
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
};
