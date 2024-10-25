import NepaliDateType from 'nepali-date-converter';

export interface Theme {
  today?: string;
  currentMonth?: string;
  selected?: string;
  hover?: string;
  header?: string;
  dayHeader?: string;
  dateGrid?:string
}

export interface CalendarProps {
  wrapperClass?: string;
  theme?: Theme;
  onChange?: (enDate: NepaliDateType) => void;
  minDate?: Date;
  maxDate?: Date;
}



export interface NepaliDate extends NepaliDateType {}
