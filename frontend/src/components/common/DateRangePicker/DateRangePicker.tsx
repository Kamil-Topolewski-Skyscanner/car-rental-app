import { FC } from 'react';
import { DatePicker } from '../DatePicker/DatePicker';
import styles from './DateRangePicker.module.css';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  // Set default dates if none provided
  const defaultStartDate = startDate || new Date();
  const defaultEndDate = endDate || new Date(Date.now() + 24 * 60 * 60 * 1000); // tomorrow

  // Maximum rental period is 30 days
  const maxDate = new Date();
  maxDate.setDate(defaultStartDate.getDate() + 30);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Your Rental Dates</h2>
      <div className={styles.pickerContainer}>
        <DatePicker
          startDate={defaultStartDate}
          endDate={defaultEndDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          minDate={new Date()}
          maxDate={maxDate}
        />
      </div>
      {startDate && endDate && (
        <div className={styles.summary}>
          {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days rental
        </div>
      )}
    </div>
  );
};
