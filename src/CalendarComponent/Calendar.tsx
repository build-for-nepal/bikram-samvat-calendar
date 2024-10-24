import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { enMonths, enToNpNum, generateDate, months, nepaliDaysName } from '../util/calendar';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import cn from '../util/cn';
import { CalendarProps } from '../types/Calender';
var adbs = require('ad-bs-converter');

export default function Calendar({
  wrapperClass = '',
  theme = {
    today: 'text-white',
    currentMonth: 'text-gray-600',
    selected: 'bg-primary text-white',
    hover: 'hover:bg-muted hover:text-white',
    header: 'font-semibold',
    dayHeader: 'text-sm text-center text-gray-500',
  },
  onChange,
  minDate,
  maxDate,
}: CalendarProps) {
  const currentDate = dayjs();
  const currentNpDate = adbs.ad2bs(
    `${currentDate.year()}/${currentDate.month()}/${currentDate.date()}`
  );
  const [today, setToday] = useState(currentNpDate.en.day);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentNpDate.en.month);

  const [selectedYear, setSelectedYear] = useState(currentNpDate.en.year);

  useEffect(() => {
    if (onChange) {
      onChange(selectDate.toDate());
    }
  }, [selectDate, onChange]);

  const isDateSelectable = (date: dayjs.Dayjs, currentMonth: boolean = false) => {
    const isAfterMin = minDate ? date.isAfter(minDate) || date.isSame(minDate) : currentMonth;
    const isBeforeMax = maxDate ? date.isBefore(maxDate) || date.isSame(maxDate) : currentMonth;
    return isAfterMin && isBeforeMax;
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setSelectedMonth(month);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };
  return (
    <div className={cn('w-[550px] border border-collapse shadow-md', wrapperClass)}>
      <div className="flex justify-between p-2 items-center mb-4">
        <div className="flex items-center">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 border rounded focus-visible::outline-none"
          >
            {Array.from({ length: 89 }, (_, i) => {
              return {
                npYear: 2000 + i,
              };
            }).map(({ npYear }) => (
              <option key={npYear} value={npYear}>
                {enToNpNum(npYear.toString())}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="ml-2 p-2 border rounded focus-visible::outline-none"
          >
            {months.monthsName.map((month, index) => (
              <option key={index} value={index}>
                {month}
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
            आज
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
      <div className="grid  h-14 grid-cols-7 bg-[#ffffff] shadow-sm">
        {nepaliDaysName.map((day, index) => (
          <h1
            key={index}
            className={cn('h-15 w-15 border-t grid place-content-center bg-', theme.dayHeader)}
          >
            {day}
          </h1>
        ))}
      </div>

      <div className="grid grid-cols-7 border-collapse">
        {generateDate(selectedMonth, selectedYear, today).map(
          ({ date, currentMonth, today }, index) => (
            <div
              key={index}
              onClick={() => {
                if (isDateSelectable(date, currentMonth)) {
                  setSelectDate(date);
                }
              }}
              className={cn(
                'p-2 cursor-pointer  text-center h-14 border-b border-r   grid place-content-center text-sm ',
                {
                  [theme.selected]: false,
                  // selectDate.toDate().toDateString() === date.toDate().toDateString(),
                  // 'opacity-50 cursor-not-allowed ': !isDateSelectable(date,currentMonth),
                  // [theme.hover]: isDateSelectable(date,currentMonth)
                }
              )}
            >
              <h1
                className={cn(
                  'h-15 w-15 rounded-full grid place-content-center transition-all  select-none',
                  {
                    [theme.today]: today,
                    [theme.currentMonth]: currentMonth,
                  }
                )}
              >
                {enToNpNum(date.toString())}
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
}
