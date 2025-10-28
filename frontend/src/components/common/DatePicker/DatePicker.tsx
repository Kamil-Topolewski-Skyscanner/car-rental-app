import { FC } from 'react';
import DatePickerLib from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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

  const handleStartDateChange = (date: Date | null) => {
    onStartDateChange(date);
    // If end date is before new start date, clear it
    if (date && endDate && endDate < date) {
      onEndDateChange(null);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    onEndDateChange(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateField}>
        <DatePickerLib
          selected={startDate}
          onChange={handleStartDateChange}
          minDate={minDate}
          maxDate={maxDate}
          customInput={
            <div className={styles.preview}>
              {startDate ? formatDate(startDate) : 'Select date'}
              <div className={styles.calendarIcon} />
            </div>
          }
          showPopperArrow={false}
          popperClassName={styles.popper}
          calendarClassName={styles.calendar}
        />
      </div>

      <div className={styles.dateField}>
        <DatePickerLib
          selected={endDate}
          onChange={handleEndDateChange}
          minDate={startDate || minDate}
          maxDate={maxDate}
          disabled={!startDate}
          customInput={
            <div className={styles.preview}>
              {endDate ? formatDate(endDate) : 'Select date'}
              <div className={styles.calendarIcon} />
            </div>
          }
          showPopperArrow={false}
          popperClassName={styles.popper}
          calendarClassName={styles.calendar}
        />
      </div>
    </div>
  );
};
