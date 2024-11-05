import React, { useMemo, useRef, useState } from 'react';
import { daysObj, enToNpNum, generateDate, getDateEvent, months, npNums } from '../util/calendar';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

import cn from '../util/cn';
import { CalendarProps, DateEventType } from '../types/Calendar';
import NepaliDate from 'nepali-date-converter';
const MAX_NP_YEAR = 2089;
const MIN_NP_YEAR = 2000;
export default function Calendar({
  wrapperClass = '',
  theme,
  lang = 'np',
  onChange,
  value = new Date(),
  onCellClick,
  onNextYear,
  onPrevYear,
  onYearSelect,
  calendarRef,
  showDateEvent = true,
  onMonthSelect,
  eventDates,
}: CalendarProps) {
  const currentDate = value instanceof Date ? new NepaliDate(value) : value;
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getYear());
  const [selectedDate, setSelectedDate] = useState<NepaliDate | null>(currentDate);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = Number(event.target.value);
    setSelectedDate(null);
    setSelectedMonth(month);
    onMonthSelect?.(months[lang][month], month);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedDate(null);
    setSelectedYear(year);
    onYearSelect?.(year);
  };

  const handleNextYear = () => {
    setSelectedDate(null);
    setSelectedYear((prev) => {
      let year = prev + 1;
      const isMaxYearGreater = year <= MAX_NP_YEAR;
      if (isMaxYearGreater) {
        onNextYear?.(year);
        return year;
      }
      onNextYear?.(prev);
      return prev;
    });
  };

  const handlePrevYear = () => {
    setSelectedDate(null);
    setSelectedYear((prev) => {
      let year = prev - 1;
      const isMinYearGreater = prev - 1 >= MIN_NP_YEAR;
      if (isMinYearGreater) {
        onPrevYear?.(year);
        return year;
      }
      onPrevYear?.(prev);
      return prev;
    });
  };
  const handleSelecteDate = (date: NepaliDate, ref: HTMLDivElement, event: DateEventType) => {
    onChange(date);
    setSelectedDate(date);
    onCellClick?.(date, ref, event); // Pass the cell reference
  };
  const resetDateToToday = () => {
    setSelectedYear(currentDate.getYear());
    setSelectedMonth(currentDate.getMonth());
    setSelectedDate(new NepaliDate());
  };

  const isLangNepali = useMemo(() => {
    return lang === 'np';
  }, [lang]);
  const iconSize = 60;
  const DatePickBody = (
    <>
      <div className={cn('grid grid-cols-7 text-sm  bg-[#ffffff] shadow-sm select-none')}>
        {daysObj[lang].map((day, index) => (
          <h1
            key={index}
            className={cn(
              'h-15  p-2 border-t grid place-content-center text-center ',
              theme?.dayHeader
            )}
          >
            {day}
          </h1>
        ))}
      </div>
      <div className="grid grid-cols-7  border-collapse">
        {generateDate(selectedMonth, selectedYear).map(({ date }, index) => {
          const today = selectedDate?.toJsDate()?.toDateString() == date?.toJsDate().toDateString();
          const selected =
            selectedDate?.toJsDate().toDateString() == date.toJsDate().toDateString();

          const event = getDateEvent(date, eventDates);
          return (
            <div
              ref={(el) => (cellRefs.current[index] = el)}
              key={index}
              onClick={() => handleSelecteDate(date, cellRefs.current[index], event)}
              className={cn(
                'cursor-pointer  h-14 text-sm  transition-all text-center  border-b  relative  grid place-content-center',
                {
                  [`text-primary ${theme?.today ?? ''}`]: today,
                  [`bg-primary text-black ${theme?.selected}`]: selected,
                  [`hover:bg-muted  ${theme?.hover}`]: !selected,
                  ['text-red-500']: showDateEvent && Boolean(event),
                },
                theme?.dateGrid,
                `${(index + 1) % 7 != 0 ? 'border-r' : ''}`
              )}
            >
              <h1
                className={cn(
                  'h-full w-full rounded-full text-md font-semibold grid place-content-center transition-all  select-none',
                  {
                    'text-red-500': (index + 1) % 7 == 0,
                  }
                )}
              >
                {isLangNepali ? enToNpNum(date.getDate().toString()) : date.getDate()}
              </h1>
              {showDateEvent && (
                <span
                  className="absolute text-ellipsis max-h-[1.5rem] bottom-[.1em]  w-full flex items-end justify-center overflow-hidden whitespace-pre-wrap"
                  style={{ fontSize: '10px' }}
                >
                  {event?.name[lang]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  const maxYear = 2000;
  const steps = 10;

  const [year, setYear] = useState(currentDate.getYear());
  const [action, setShowAction] = useState('dates');
  const handleClickOnYearSelection = () => {};

  return (
    <div
      ref={calendarRef}
      className={cn(
        'min-w-[400px]  max-w-[600px] w-full border border-collapse shadow-md bg-white rounded-md',
        wrapperClass
      )}
    >
      <div className={cn('flex justify-between h-[40px]', theme?.header)}>
        <div className="w-[20%] flex justify-between items-center">
          <button className="hover:bg-muted text-center flex justify-center items-center  w-1/2 h-full ">
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <button className="hover:bg-muted text-center flex justify-center items-center  w-1/2 h-full ">
            <MdKeyboardArrowLeft className="hover:bg-muted" />
          </button>
        </div>
        <div
          onClick={handleClickOnYearSelection}
          className="w-[55%] select-none flex justify-center  items-center text-center hover:bg-muted cursor-pointer"
        >
          {months[lang][selectedMonth]}{' '}
          {isLangNepali ? enToNpNum(selectedYear.toString()) : selectedYear}
        </div>
        <div className="w-[20%] flex justify-between items-center">
          <button className="hover:bg-muted text-center flex justify-center items-center  w-1/2 h-full ">
            <MdKeyboardArrowRight />
          </button>
          <button className="hover:bg-muted text-center flex justify-center items-center  w-1/2 h-full ">
            <MdOutlineKeyboardDoubleArrowRight className="hover:bg-muted" />
          </button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 place-content-center ">
        {Array.from(
          {
            length: 6,
          },
          (_, k) => k + 1
        ).map((item, key) => {
          return (
            <div
              className="w-[150px] cursor-pointer flex items-center justify-center h-[90px] text-center hover:bg-muted font-medium"
              key={key}
            >
              {`201${key}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}
