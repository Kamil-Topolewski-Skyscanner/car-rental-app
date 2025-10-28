import { FC, useState } from 'react';
import { Car, ReservationService } from '../../../services';
import { DatePicker } from '../../common/DatePicker/DatePicker';
import styles from './ReservationModal.module.css';

interface ReservationModalProps {
  car: Car;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReservationModal: FC<ReservationModalProps> = ({
  car,
  onClose,
  onSuccess,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * car.pricePerDay;
  };

  const handleReserve = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await ReservationService.createReservation({
        carId: car.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        // These would typically come from a form or user context
        customerName: 'Test Customer',
        customerEmail: 'test@example.com'
      });

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>Reserve {car.make} {car.model}</h2>

        <div className={styles.content}>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // +30 days
          />

          {startDate && endDate && (
            <div className={styles.summary}>
              <p className={styles.price}>
                Total Price: ${totalPrice.toFixed(2)}
              </p>
              <p className={styles.days}>
                {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>
          )}

          {error && (
            <div className={styles.error}>{error}</div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={styles.reserveButton}
              onClick={handleReserve}
              disabled={loading || !startDate || !endDate}
            >
              {loading ? 'Creating Reservation...' : 'Confirm Reservation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
