import { createContext, useContext, useState, useCallback, useMemo, FC, ReactNode } from 'react';
import { Car, CarType, CarService } from '../../services';

interface CarsContextType {
  cars: Car[];
  loading: boolean;
  error: Error | null;
  fetchCars: () => Promise<void>;
  fetchCarsByType: (type: CarType) => Promise<void>;
  getCarById: (id: string) => Car | undefined;
}

const CarsContext = createContext<CarsContextType | undefined>(undefined);

interface CarsProviderProps {
  children: ReactNode;
}

export const CarsProvider: FC<CarsProviderProps> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CarService.getAllCars();
      setCars(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cars'));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCarsByType = useCallback(async (type: CarType) => {
    try {
      setLoading(true);
      setError(null);
      const data = await CarService.getCarsByType(type);
      setCars(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cars'));
    } finally {
      setLoading(false);
    }
  }, []);

  const getCarById = useCallback((id: string) => {
    return cars.find(car => car.id === id);
  }, [cars]);

  const value = useMemo(() => ({
    cars,
    loading,
    error,
    fetchCars,
    fetchCarsByType,
    getCarById,
  }), [cars, loading, error, fetchCars, fetchCarsByType, getCarById]);

  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarsContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};
