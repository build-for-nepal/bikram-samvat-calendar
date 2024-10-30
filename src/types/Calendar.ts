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
  showDateEvent?:boolean;
  onChange?: (enDate: NepaliDateType) => void;
  value: Date | NepaliDate | undefined;
  calendarRef?: React.MutableRefObject<HTMLDivElement | undefined>;
  onCellClick?: (date: NepaliDate, cellRef: HTMLDivElement,event?:DateEventType) => void;
  onNextYear?: (newYear: number) => void;
  onPrevYear?: (newYear: number) => void;
  onYearSelect?: (newYear: number) => void;
  onMonthSelect?: (name: string, monthIndex: number) => void;
}

export interface NepaliDate extends NepaliDateType {}


export type DateEventType  = {
  name:DateEventDetailType,
  description: DateEventDetailType
}

type DateEventDetailType ={
  np:string
  en:string
}