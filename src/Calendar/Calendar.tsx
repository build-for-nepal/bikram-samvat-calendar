import React, { useMemo, useState } from 'react';
import { daysObj, enToNpNum, generateDate, months } from '../util/calendar';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import cn from '../util/cn';
import { CalendarProps } from '../types/Calender';
import NepaliDate from 'nepali-date-converter';
const MAX_NP_YEAR = 2089;
const MIN_NP_YEAR = 2000;
export default function Calendar({
  wrapperClass = '',
  theme,
  lang ='np',
  onChange,
  value = new Date(),
}: CalendarProps) {
  const currentDate = value instanceof Date ?  new NepaliDate(value) : value;
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getYear());
  const [selectedDate, setSelectedDate] = useState<NepaliDate | null>(currentDate);
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = Number(event.target.value);
    setSelectedDate(null);
    setSelectedMonth(month);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedDate(null);
    setSelectedYear(year);
  };

  const handleNextYear = () => {
    setSelectedDate(null);
    setSelectedYear((prev) => {
      const isMaxYearGreater = prev + 1 <= MAX_NP_YEAR;
      return isMaxYearGreater ? prev + 1 : prev;
    });
  };

  const handlePrevYear = () => {
    setSelectedDate(null);
    setSelectedYear((prev) => {
      const isMinYearGreater = prev - 1 >= MIN_NP_YEAR;
      return isMinYearGreater ? prev - 1 : prev;
    });
  };
  const handleSelecteDate = (date: NepaliDate) => {
    onChange(date);
    setSelectedDate(date);
  };
  const resetDateToToday = () => {
    setSelectedYear(currentDate.getYear());
    setSelectedMonth(currentDate.getMonth());
  };

  const isLangNepali = useMemo(()=>{
  return   lang ==='np'

  },[lang])
  return (
    <div
      className={cn('min-w-[400px] w-fit border border-collapse shadow-md bg-white', wrapperClass)}
    >
      <div className={cn('flex justify-between p-2 items-center mb-4', theme?.header)}>
        <div className="flex items-center">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 border rounded focus:outline-none focus-visible::outline-none "
          >
            {Array.from({ length: 90 }, (_, i) => {
              return {
                npYear: 2000 + i,
              };
            }).map(({ npYear }) => (
              <option key={npYear} value={npYear}>
                {isLangNepali  ? enToNpNum(npYear.toString()) : npYear}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="ml-2 p-2 border rounded focus:outline-none focus-visible::outline-none"
          >
            {months[lang].map((month, index) => (
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
            { isLangNepali?'आज':"Today"}
          </h1>
          <GrFormNext
            className={cn('w-5 h-5 cursor-pointer hover:scale-105 transition-all', {
              'cursor-not-allowed  text-gray-400 ': selectedYear === MAX_NP_YEAR,
            })}
            onClick={handleNextYear}
          />
        </div>
      </div>
      <div className={cn('grid grid-cols-7  bg-[#ffffff] shadow-sm select-none')}>
        {daysObj[lang].map((day, index) => (
          <h1
            key={index}
            className={cn(
              'h-15 text-sm  p-2 border-t grid place-content-center text-center ',
              theme?.dayHeader
            )}
          >
            {day}
          </h1>
        ))}
      </div>

      <div className="grid grid-cols-7  border-collapse">
        {generateDate(selectedMonth, selectedYear).map(({ date }, index) => {
          const today = currentDate.toJsDate().toDateString() == date.toJsDate().toDateString();
          const selected =
            selectedDate?.toJsDate().toDateString() == date.toJsDate().toDateString();
          return (
            <div
              key={index}
              onClick={() => handleSelecteDate(date)}
              className={cn(
                'cursor-pointer   h-14  transition-all text-center  border-b border-r   grid place-content-center text-sm ',
                {
                  [`text-primary ${theme?.today}`]: today,
                  [`bg-primary text-black ${theme?.selected}`]: selected,
                  [`hover:bg-muted  ${theme?.hover}`]: !selected,
                },
                theme?.dateGrid
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
                {isLangNepali ? enToNpNum(date.getDate().toString()): date.getDate()}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
