import { createContext, useContext, useState, FC, ReactNode } from 'react';

interface DateRangeContextType {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

interface DateRangeProviderProps {
  children: ReactNode;
}

export const DateRangeProvider: FC<DateRangeProviderProps> = ({ children }) => {
  // Initialize with today and tomorrow as default dates
  const [startDate, setStartDateState] = useState<Date | null>(new Date());
  const [endDate, setEndDateState] = useState<Date | null>(new Date(Date.now() + 24 * 60 * 60 * 1000));

  const setStartDate = (date: Date | null) => setStartDateState(date);
  const setEndDate = (date: Date | null) => setEndDateState(date);

  return (
    <DateRangeContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
};
