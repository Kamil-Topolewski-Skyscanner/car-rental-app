import { useState } from 'react';
import styles from './Calendar.module.css';

interface CalendarProps {
  selectedDate?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const Calendar = ({ selectedDate, onChange, minDate, maxDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const renderDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startingDay = firstDay.getDay();

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.day} />);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const disabled = isDateDisabled(date);

      days.push(
        <button
          key={day}
          className={`${styles.day} ${isSelected ? styles.selected : ''} ${
            disabled ? styles.disabled : ''
          }`}
          onClick={() => !disabled && onChange(date)}
          disabled={disabled}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={prevMonth} className={styles.navButton}>&lt;</button>
        <span>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={nextMonth} className={styles.navButton}>&gt;</button>
      </div>
      <div className={styles.weekdays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>{renderDays()}</div>
    </div>
  );
};
