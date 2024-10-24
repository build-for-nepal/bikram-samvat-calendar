import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import {
  convertToDateObj,
  enToNpNum,
  generateDate,
  months,
  nepaliDaysName,
} from '../util/calendar';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import cn from '../util/cn';
import { CalendarProps, selectDateType } from '../types/Calender';
var adbs = require('ad-bs-converter');

const MAX_NP_YEAR = 2089;
const MIN_NP_YEAR = 2000;
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
}: CalendarProps) {
  const { currentNpDate: currentDate, currentEnDate } = currentNpDate();
  const npYear = currentDate.en.year;
  const npMonth = currentDate.en.month;
  const npDate = currentDate.en.day;
  const [today, setToday] = useState(npDate);
  const [selectDate, setSelectDate] = useState<selectDateType>({
    enDate: currentEnDate,
    npDate: `${npYear}/${npMonth}/${npDate}`,
  });
  const [selectedMonth, setSelectedMonth] = useState(npMonth);

  const [selectedYear, setSelectedYear] = useState(npYear);

  useEffect(() => {
    if (onChange) {
      onChange(selectDate.enDate.toDate(), selectDate.npDate);
    }
  }, [selectDate, onChange]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setToday(0)
    setSelectedMonth(month);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setToday(0)
    setSelectedYear(year);
  };

  const handleNextYear = () => {
    setToday(0)
    setSelectedYear((prev) => {
      const isMaxYearGreater = prev + 1 <= MAX_NP_YEAR;
      return isMaxYearGreater ? prev + 1 : prev;
    });
  };

  const handlePrevYear = () => {
    setToday(0)
    setSelectedYear((prev) => {
      const isMinYearGreater = prev - 1 >= MIN_NP_YEAR;
      return isMinYearGreater ? prev - 1 : prev;
    });
  };
  const handleSelecteDate = (date: number) => {
    setToday(date);
    const dateObj = convertToDateObj(selectedYear, selectedMonth, date);
    setSelectDate(dateObj);
  };
  const resetDateToToday = () => {
    setSelectedYear(currentDate.en.year);
    setSelectedMonth(currentDate.en.month);
    setToday(currentDate.en.day);
  };
  function currentNpDate() {
    const currentEnDate = dayjs();
    const currentNpDate = adbs.ad2bs(
      `${currentEnDate.year()}/${currentEnDate.month()}/${currentEnDate.date()}`
    );
    return { currentNpDate, currentEnDate };
  }
  return (
    <div className={cn('w-[550px] border border-collapse shadow-md', wrapperClass)}>
      <div className="flex justify-between p-2 items-center mb-4">
        <div className="flex items-center">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 border rounded focus-visible::outline-none"
          >
            {Array.from({ length: 90 }, (_, i) => {
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
            className={cn('w-5 h-5 cursor-pointer hover:scale-105 transition-all', {
              'cursor-not-allowed  text-gray-400 ': selectedYear === MIN_NP_YEAR,
            })}
            onClick={handlePrevYear}
          />
          <h1 className="cursor-pointer hover:scale-105 transition-all" onClick={resetDateToToday}>
            आज
          </h1>
          <GrFormNext
            className={cn('w-5 h-5 cursor-pointer hover:scale-105 transition-all', {
              'cursor-not-allowed  text-gray-400 ': selectedYear === MAX_NP_YEAR,
            })}
            onClick={handleNextYear}
          />
        </div>
      </div>
      <div className="grid  h-14 grid-cols-7 bg-[#ffffff] shadow-sm select-none">
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
              onClick={() => handleSelecteDate(date)}
              className={cn(
                'p-2 cursor-pointer  transition-all text-center h-14 border-b border-r   grid place-content-center text-sm ',
                {
                  [theme.selected]: today,
                  ' cursor-not-allowed ': !currentMonth,
                  [theme.hover]: currentMonth && !today,
                }
              )}
            >
              <h1
                className={cn(
                  'h-15 w-15 rounded-full text-md font-semibold grid place-content-center transition-all  select-none',
                  {
                    [theme.today]: today,
                    'opacity-50 text-grey-300': !currentMonth,
                    [theme.currentMonth]: currentMonth,
                    'text-red-500': (index + 1) % 7 == 0,
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
