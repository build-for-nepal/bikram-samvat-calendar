import dayjs from 'dayjs';
import NepaliDateType from 'nepali-date-converter';

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
  onChange?: (enDate: NepaliDateType) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface selectDateType {
  enDate: dayjs.Dayjs;
  npDate: string;
}

export interface NepaliDate extends NepaliDateType {}
