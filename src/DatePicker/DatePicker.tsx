import React, { useEffect, useRef, useState } from 'react';
import Calendar from '../Calendar/Calendar'; // Import your Calendar component
import NepaliDate from 'nepali-date-converter';
import cn from '../util/cn';
import { CalendarProps, langType } from '../types/Calendar';
import { parseDate } from '../util/calendar';
interface Props
  extends Pick<
    CalendarProps,
    'onCellClick' | 'onMonthSelect' | 'onNextYear' | 'onPrevYear' | 'onYearSelect' | 'calendarRef'
  > {
  inputStyle?: string;
  onChange: (data: NepaliDate) => void;
  value: Date | NepaliDate | undefined;
  placeholder?: string;
  wrapperClass?: string;
  lang?: langType;
  calenderProps?: Omit<CalendarProps, 'onChange' | 'value'>;
}
const DatePicker = ({
  inputStyle,
  onChange,
  value,
  wrapperClass,
  calenderProps,
  lang = 'np',
  placeholder = 'Select a Date',
  onCellClick,
  onMonthSelect,
  onNextYear,
  onPrevYear,
  onYearSelect,
  calendarRef,
}: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarContainer = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDateChange = (date: NepaliDate) => {
    onChange?.(date);
  };
  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };
  useEffect(() => {
    window.addEventListener('click', function (event) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    });
  }, []);
  const positionCalendar = () => {
    if (showCalendar && inputRef.current && calendarContainer.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const calendarHeight = calendarContainer.current.offsetHeight;
      const spaceBelow = window.innerHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      if (spaceBelow < calendarHeight && spaceAbove > calendarHeight) {
        calendarContainer.current.style.top = `${-(calendarHeight + 10)}px`;
      } else {
        calendarContainer.current.style.top = `${inputRect.height + 5}px`; // Adding some margin
      }
    }
  };

  useEffect(() => {
    positionCalendar();
    window.addEventListener('scroll', positionCalendar);
    return () => {
      window.addEventListener('scroll', positionCalendar);
    };
  }, [showCalendar]);

  return (
    <div
      style={{ position: 'relative' }}
      className={cn('relative', wrapperClass)}
      ref={containerRef}
    >
      <input
        ref={inputRef}
        type="text"
        value={parseDate(value)?.format('YYYY/MM/DD', lang)}
        onClick={toggleCalendar}
        readOnly
        className={cn(
          'p-2 border rounded  w-full h-full focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition duration-200',
          inputStyle
        )}
        placeholder={placeholder}
      />
      {showCalendar && (
        <div
          className={`absolute top-0 z-30 mt-1 transition-opacity duration-300 transform ${
            showCalendar ? 'opacity-100' : 'opacity-0'
          }`}
          ref={calendarContainer}
        >
          <Calendar
            calendarRef={calendarRef}
            onChange={handleDateChange}
            onCellClick={onCellClick}
            onMonthSelect={onMonthSelect}
            onNextYear={onNextYear}
            onPrevYear={onPrevYear}
            onYearSelect={onYearSelect}
            lang={lang}
            theme={{
              dateGrid: 'border-none',
              ...calenderProps?.theme,
            }}
            wrapperClass={calenderProps?.wrapperClass}
            value={value}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
