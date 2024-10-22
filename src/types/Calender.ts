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
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}
