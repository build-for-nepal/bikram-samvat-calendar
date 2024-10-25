import React, { useEffect, useRef, useState } from 'react';
import Calendar from '../Calendar/Calendar'; // Import your Calendar component
import NepaliDate from 'nepali-date-converter';
import cn from '../util/cn';
import { CalendarProps } from '../types/Calender';
interface Props {
  inputStyle?: string;
  onChange: (data: NepaliDate) => void;
  value: Date | undefined;
  placeholder?: string;
  calenderProps?: Omit<CalendarProps, 'onChange' | 'value'>;
}
const DatePicker = ({
  inputStyle,
  onChange,
  value,
  calenderProps,
  placeholder = 'Select a Date',
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
    <div className="relative" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={value ? new NepaliDate(value)?.format('YYYY/MM/DD') : ''}
        onClick={toggleCalendar}
        readOnly
        className={cn(
          'p-2 border rounded  focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition duration-200',
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
            onChange={handleDateChange}
            theme={{
              dateGrid: 'border-none h-10 w-10',
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
