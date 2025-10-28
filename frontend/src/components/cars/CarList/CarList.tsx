import { FC, useState, useCallback, useMemo } from 'react';
import { Car, CarType } from '../../../services';
import { CarCard } from '../CarCard/CarCard';
import styles from './CarList.module.css';

interface CarListProps {
  cars: Car[];
  onCarSelect: (car: Car) => void;
}

export const CarList: FC<CarListProps> = ({ cars, onCarSelect }) => {
  const [selectedType, setSelectedType] = useState<CarType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTypeSelect = useCallback((type: CarType) => {
    setSelectedType(currentType => currentType === type ? null : type);
  }, []);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesType = !selectedType || car.type === selectedType;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        car.make.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower);
      return matchesType && matchesSearch;
    });
  }, [cars, selectedType, searchQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by make or model..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filters}>
        {Object.values(CarType).map(type => (
          <button
            key={type}
            onClick={() => handleTypeSelect(type)}
            className={`${styles.filterButton} ${
              selectedType === type ? styles.filterButtonActive : ''
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              onClick={onCarSelect}
            />
          ))
        ) : (
          <div className={styles.noResults}>
            No cars found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};
