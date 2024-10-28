import NepaliDateType from 'nepali-date-converter';

export interface Theme {
  today?: string;
  currentMonth?: string;
  selected?: string;
  hover?: string;
  header?: string;
  dayHeader?: string;
  dateGrid?: string;
}

export type langType = 'en' | 'np';
export interface CalendarProps {
  wrapperClass?: string;
  theme?: Theme;
  lang?: langType;
  onChange?: (enDate: NepaliDateType) => void;
  value: Date | NepaliDate | undefined;
}

export interface NepaliDate extends NepaliDateType {}
