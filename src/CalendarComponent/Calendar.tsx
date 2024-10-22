import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { generateDate, months } from '../util/calendar';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import cn from '../util/cn';
import { CalendarProps } from '../types/Calender';

export default function Calendar({
  wrapperClass = '',
  theme = {
    today: 'bg-red-600 text-white',
    currentMonth: 'text-gray-600',
    selected: 'bg-black text-white',
    hover: 'hover:bg-black hover:text-white',
    header: 'font-semibold',
    dayHeader: 'text-sm text-center text-gray-500',
  },
  onChange,
  minDate,
  maxDate,
}: CalendarProps) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(today.month());
  const [selectedYear, setSelectedYear] = useState(today.year());

  useEffect(() => {
    if (onChange) {
      onChange(selectDate.toDate());
    }
  }, [selectDate, onChange]);

  const isDateSelectable = (date: dayjs.Dayjs) => {
    const isAfterMin = minDate ? date.isAfter(minDate) || date.isSame(minDate) : true;
    const isBeforeMax = maxDate ? date.isBefore(maxDate) || date.isSame(maxDate) : true;
    return isAfterMin && isBeforeMax;
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value);
    setSelectedMonth(month);
    setToday(today.month(month).year(selectedYear));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    setToday(today.year(year).month(selectedMonth));
  };

  return (
    <div className={cn('max-w-96 border p-5 shadow-md', wrapperClass)}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mr-2 p-1 border rounded"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange} className="p-1 border rounded">
            {Array.from({ length: 10 }, (_, i) => today.year() - 5 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-5 items-center">
          <GrFormPrevious
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              const newMonth = today.month() === 0 ? 11 : today.month() - 1;
              const newYear = newMonth === 11 ? today.year() - 1 : today.year();
              setToday(today.month(newMonth).year(newYear));
              setSelectedMonth(newMonth);
              setSelectedYear(newYear);
            }}
          />
          <h1
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(currentDate);
              setSelectDate(currentDate);
              setSelectedMonth(currentDate.month());
              setSelectedYear(currentDate.year());
            }}
          >
            Today
          </h1>
          <GrFormNext
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              const newMonth = today.month() === 11 ? 0 : today.month() + 1;
              const newYear = newMonth === 0 ? today.year() + 1 : today.year();
              setToday(today.month(newMonth).year(newYear));
              setSelectedMonth(newMonth);
              setSelectedYear(newYear);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-7">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <h1 key={index} className={cn('h-14 w-14 grid place-content-center', theme.dayHeader)}>
            {day}
          </h1>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
          <div
            key={index}
            className="p-2 text-center h-14 grid place-content-center text-sm border-t"
          >
            <h1
              className={cn(
                'h-10 w-10 rounded-full grid place-content-center transition-all cursor-pointer select-none',
                theme.hover,
                {
                  [theme.today]: today,
                  [theme.currentMonth]: currentMonth,
                  [theme.selected]:
                    selectDate.toDate().toDateString() === date.toDate().toDateString(),
                  'opacity-50 cursor-not-allowed': !isDateSelectable(date),
                }
              )}
              onClick={() => {
                if (isDateSelectable(date)) {
                  setSelectDate(date);
                }
              }}
            >
              {date.date()}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
