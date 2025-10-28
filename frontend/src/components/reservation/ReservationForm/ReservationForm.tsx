import { FC, useState, useCallback } from 'react';
import { Car, ReservationRequest } from '../../../services';
import styles from './ReservationForm.module.css';

interface ReservationFormProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  onSubmit: (reservation: ReservationRequest) => void;
}

interface FormErrors {
  customerName?: string;
  customerEmail?: string;
}

export const ReservationForm: FC<ReservationFormProps> = ({
  car,
  startDate,
  endDate,
  totalPrice,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const reservationRequest: ReservationRequest = {
      carId: car.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
    };

    try {
      await onSubmit(reservationRequest);
    } catch (error) {
      console.error('Error submitting reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [car.id, startDate, endDate, formData, onSubmit, validateForm]);

  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Complete Your Reservation</h2>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="customerName">
          Full Name
        </label>
        <input
          id="customerName"
          name="customerName"
          type="text"
          value={formData.customerName}
          onChange={handleChange}
          className={`${styles.input} ${errors.customerName ? styles.error : ''}`}
        />
        {errors.customerName && (
          <div className={styles.errorText}>{errors.customerName}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="customerEmail">
          Email
        </label>
        <input
          id="customerEmail"
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={handleChange}
          className={`${styles.input} ${errors.customerEmail ? styles.error : ''}`}
        />
        {errors.customerEmail && (
          <div className={styles.errorText}>{errors.customerEmail}</div>
        )}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Car:</span>
          <span>{`${car.make} ${car.model}`}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Duration:</span>
          <span>{`${days} day${days > 1 ? 's' : ''}`}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Price per day:</span>
          <span>${car.pricePerDay.toFixed(2)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
      </button>
    </form>
  );
};
