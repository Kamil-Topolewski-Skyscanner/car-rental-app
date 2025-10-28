import { FC, useState } from 'react';
import styles from './ReservationForm.module.css';

interface ReservationFormProps {
  onSubmit: (data: { customerName: string; customerEmail: string }) => void;
}

export const ReservationForm: FC<ReservationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: ''
  });

  const [errors, setErrors] = useState<{
    customerName?: string;
    customerEmail?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: { [key: string]: string } = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="customerName" className={styles.label}>
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
          <div className={styles.errorMessage}>{errors.customerName}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="customerEmail" className={styles.label}>
          Email Address
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
          <div className={styles.errorMessage}>{errors.customerEmail}</div>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Continue to Review
      </button>
    </form>
  );
};
