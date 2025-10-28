import { createContext, useContext, useState, useCallback, useMemo, FC, ReactNode } from 'react';
import { Reservation, ReservationRequest, ReservationService } from '../../services';

interface ReservationContextType {
  reservations: Reservation[];
  loading: boolean;
  error: Error | null;
  createReservation: (request: ReservationRequest) => Promise<void>;
  fetchReservationsByCustomerId: (customerId: string) => Promise<void>;
  getReservationById: (id: string) => Reservation | undefined;
  cancelReservation: (id: string) => Promise<void>;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

interface ReservationProviderProps {
  children: ReactNode;
}

export const ReservationProvider: FC<ReservationProviderProps> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createReservation = useCallback(async (request: ReservationRequest) => {
    try {
      setLoading(true);
      setError(null);
      const reservation = await ReservationService.createReservation(request);
      setReservations(prev => [...prev, reservation]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create reservation'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReservationsByCustomerId = useCallback(async (customerId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ReservationService.getReservationsByCustomerId(customerId);
      setReservations(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch reservations'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReservationById = useCallback((id: string) => {
    return reservations.find(reservation => reservation.id === id);
  }, [reservations]);

  const cancelReservation = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ReservationService.cancelReservation(id);
      setReservations(prev => prev.filter(reservation => reservation.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to cancel reservation'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    reservations,
    loading,
    error,
    createReservation,
    fetchReservationsByCustomerId,
    getReservationById,
    cancelReservation,
  }), [
    reservations,
    loading,
    error,
    createReservation,
    fetchReservationsByCustomerId,
    getReservationById,
    cancelReservation,
  ]);

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};
