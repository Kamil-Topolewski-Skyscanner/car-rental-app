import { FC, useState } from 'react';
import { Car, ReservationService } from '../../../services';
import { ReservationForm } from '../../forms/ReservationForm/ReservationForm';
import styles from './ReservationModal.module.css';

interface ReservationModalProps {
  car: Car;
  onClose: () => void;
  onSuccess: () => void;
  startDate: Date;
  endDate: Date;
}

export const ReservationModal: FC<ReservationModalProps> = ({
  car,
  onClose,
  onSuccess,
  startDate,
  endDate
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'review'>('form');
  const [customerData, setCustomerData] = useState<{
    customerName: string;
    customerEmail: string;
  } | null>(null);

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * car.pricePerDay;
  };

  const handleFormSubmit = (data: { customerName: string; customerEmail: string }) => {
    setCustomerData(data);
    setStep('review');
  };

  const handleReserve = async () => {
    if (!startDate || !endDate || !customerData) {
      setError('Missing required information');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await ReservationService.createReservation({
        carId: car.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        customerName: customerData.customerName,
        customerEmail: customerData.customerEmail
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
        <h2 className={styles.title}>
          {step === 'form'
            ? `Reserve ${car.make} ${car.model}`
            : 'Review Your Reservation'
          }
        </h2>

        <div className={styles.content}>
          <div className={styles.dates}>
            <p>From: {startDate.toLocaleDateString()}</p>
            <p>To: {endDate.toLocaleDateString()}</p>
          </div>

          <div className={styles.summary}>
            <p className={styles.price}>
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <p className={styles.days}>
              {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>

          {error && (
            <div className={styles.error}>{error}</div>
          )}

          {step === 'form' ? (
            <ReservationForm onSubmit={handleFormSubmit} />
          ) : (
            <div>
              <div className={styles.reviewSection}>
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {customerData?.customerName}</p>
                <p><strong>Email:</strong> {customerData?.customerEmail}</p>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setStep('form')}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  className={styles.reserveButton}
                  onClick={handleReserve}
                  disabled={loading}
                >
                  {loading ? 'Creating Reservation...' : 'Confirm Reservation'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
