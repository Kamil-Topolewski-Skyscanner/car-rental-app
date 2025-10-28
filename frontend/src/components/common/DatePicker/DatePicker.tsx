import { FC } from 'react';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker: FC<DatePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate = new Date(),
  maxDate,
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onStartDateChange(date);

    // If end date is before new start date, clear it
    if (date && endDate && endDate < date) {
      onEndDateChange(null);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onEndDateChange(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateField}>
        <label htmlFor="start-date">Start Date</label>
        <input
          type="date"
          id="start-date"
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={handleStartDateChange}
          min={minDate.toISOString().split('T')[0]}
          max={maxDate?.toISOString().split('T')[0]}
          className={styles.input}
        />
        {startDate && (
          <div className={styles.preview}>{formatDate(startDate)}</div>
        )}
      </div>

      <div className={styles.dateField}>
        <label htmlFor="end-date">End Date</label>
        <input
          type="date"
          id="end-date"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={handleEndDateChange}
          min={startDate ? startDate.toISOString().split('T')[0] : minDate.toISOString().split('T')[0]}
          max={maxDate?.toISOString().split('T')[0]}
          disabled={!startDate}
          className={styles.input}
        />
        {endDate && (
          <div className={styles.preview}>{formatDate(endDate)}</div>
        )}
      </div>
    </div>
  );
};
