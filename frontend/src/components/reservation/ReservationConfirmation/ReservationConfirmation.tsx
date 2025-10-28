import { FC } from 'react';
import { Reservation } from '../../../services/types';
import styles from './ReservationConfirmation.module.css';

interface ReservationConfirmationProps {
  reservation: Reservation;
  onClose: () => void;
}

export const ReservationConfirmation: FC<ReservationConfirmationProps> = ({
  reservation,
  onClose
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Reservation Complete!</h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.content}>
          <div className={styles.successIcon}>✓</div>

          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.label}>Reservation ID:</span>
              <span className={styles.value}>{reservation.id}</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.label}>Start Date:</span>
              <span className={styles.value}>{formatDate(reservation.reservationStartDate)}</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.label}>End Date:</span>
              <span className={styles.value}>{formatDate(reservation.reservationEndDate)}</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.label}>Duration:</span>
              <span className={styles.value}>{reservation.duration} days</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.label}>Total Price:</span>
              <span className={styles.value}>${reservation.price.toFixed(2)}</span>
            </div>
          </div>

          <button className={styles.confirmButton} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
