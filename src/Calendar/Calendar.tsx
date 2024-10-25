import React, {useState } from 'react';
import { enToNpNum, generateDate, months, nepaliDaysName } from '../util/calendar';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import cn from '../util/cn';
import { CalendarProps } from '../types/Calender';
import NepaliDate from 'nepali-date-converter';
const MAX_NP_YEAR = 2089;
const MIN_NP_YEAR = 2000;
export default function Calendar({
  wrapperClass = '',
  theme = {
    today: 'text-primary',
    selected: 'bg-primary text-black',
    hover: 'hover:bg-muted ',
    header: 'font-semibold ',
    dayHeader: 'text-sm text-center text-gray-500',
    dateGrid:'h-14',
  },
  onChange,
}: CalendarProps) {
  const currentDate = new NepaliDate();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getYear());
  const [selectedDate,setSelectedDate] = useState<NepaliDate | null>(currentDate)
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


  return (
    <div className={cn('min-w-[400px] w-fit border border-collapse shadow-md bg-white', wrapperClass)}>
      <div className={cn("flex justify-between p-2 items-center mb-4",theme.header)}>
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
                {enToNpNum(npYear.toString())}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="ml-2 p-2 border rounded focus:outline-none focus-visible::outline-none"
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
      <div className={cn('grid grid-cols-7  bg-[#ffffff] shadow-sm select-none',)}>
        {nepaliDaysName.map((day, index) => (
          <h1
            key={index}
            className={cn('h-15 w-15  p-2 border-t grid place-content-center ', theme.dayHeader)}
          >
            {day}
          </h1>
        ))}
      </div>

      <div className="grid grid-cols-7  border-collapse">
        {generateDate(selectedMonth, selectedYear).map(({ date, currentMonth }, index) => {
           const today = currentDate.toJsDate().toDateString() == date.toJsDate().toDateString()
           const selected =  selectedDate?.toJsDate().toDateString() == date.toJsDate().toDateString()
          return (
            <div
              key={index}
              onClick={() => handleSelecteDate(date)}
              className={cn(
                'cursor-pointer  transition-all text-center  border-b border-r   grid place-content-center text-sm ',
                {
                  [theme.today] : today,
                  [theme.selected]:selected,
                  [theme.hover] : !selected,
                })}
            >
              <h1
                className={cn(
                  'h-15 w-15 rounded-full text-md font-semibold grid place-content-center transition-all  select-none',
                  {
                    'text-red-500': (index + 1) % 7 == 0,
                   
                  },theme.dateGrid
                )}
              >
                {date.getDate()}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
