import dayjs from 'dayjs';

export interface Theme {
  today?: string;
  currentMonth?: string;
  selected?: string;
  hover?: string;
  header?: string;
  dayHeader?: string;
}

export interface CalendarProps {
  wrapperClass?: string;
  theme?: Theme;
  onChange?: (enDate: Date, npDate?: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface selectDateType {
  enDate: dayjs.Dayjs;
  npDate: string;
}
