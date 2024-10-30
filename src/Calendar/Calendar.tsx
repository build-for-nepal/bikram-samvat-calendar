import React, {  useMemo, useRef, useState } from 'react';
import { daysObj, enToNpNum, generateDate, getDateEvent, months } from '../util/calendar';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
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
  eventDates
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

  return (
    <div
      ref={calendarRef}
      className={cn(
        'min-w-[400px]  max-w-[600px] w-full border border-collapse shadow-md bg-white',
        wrapperClass
      )}
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
                {isLangNepali ? enToNpNum(npYear.toString()) : npYear}
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
            {isLangNepali ? 'आज' : 'Today'}
          </h1>
          <GrFormNext
            className={cn('w-5 h-5 cursor-pointer hover:scale-105 transition-all', {
              'cursor-not-allowed  text-gray-400 ': selectedYear === MAX_NP_YEAR,
            })}
            onClick={handleNextYear}
          />
        </div>
      </div>
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

          const event = getDateEvent(date.toJsDate(),eventDates);
          return (
            <div
              ref={(el) => (cellRefs.current[index] = el)}
              key={index}
              onClick={() => handleSelecteDate(date, cellRefs.current[index], event)}
              className={cn(
                'cursor-pointer  h-14 text-sm  transition-all text-center  border-b border-r  relative  grid place-content-center',
                {
                  [`text-primary ${theme?.today}`]: today,
                  [`bg-primary text-black ${theme?.selected}`]: selected,
                  [`hover:bg-muted  ${theme?.hover}`]: !selected,
                  ['text-red-500']: showDateEvent && Boolean(event),
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
                {isLangNepali ? enToNpNum(date.getDate().toString()) : date.getDate()}
              </h1>
              {showDateEvent && (
                <span
                  className="absolute text-ellipsis max-h-[1.5rem] bottom-[.1em]  w-full overflow-hidden whitespace-pre-wrap"
                  style={{ fontSize: '10px' }}
                >
                  {event?.name[lang]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
