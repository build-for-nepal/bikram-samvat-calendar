import React, { useState, useCallback, useRef } from 'react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import {
  months,
  convertLangToLocale,
  generateDecadesInRange,
  daysObj,
  generateDate,
  getDateEvent,
  navigationTextHelper,
} from '../util/calendar'; // Assuming months and other utils are imported
import cn from '../util/cn';
import { CalendarProps, DateEventType } from '../types/Calendar';
import NepaliDate from 'nepali-date-converter';

const MIN_NP_YEAR = 2000;
const MAX_NP_YEAR = 2089;

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      wrapperClass = '',
      theme,
      lang = 'np',
      onChange,
      value = new Date(),
      onCellClick,
      onNextYear,
      onPrevYear,
      onYearSelect,
      showDateEvent = true,
      onMonthSelect,
      eventDates,
      onPrevMonth,
      onNextMonth,
    }: CalendarProps,
    ref
  ) => {
    const currentDate = value instanceof Date ? new NepaliDate(value) : value;
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(selectedDate.getYear());
    const [view, setView] = useState(''); // Current view: 'month', 'year', 'decade', ''
    const [navigationText, setNavigationText] = useState(
      months[lang][selectedMonth] + ' ' + convertLangToLocale(selectedYear.toString(), lang)
    );
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

    function rangeNavigationTextHelper(startYear: number) {
      setNavigationText(
        convertLangToLocale(`${startYear}`, lang) +
          '-' +
          convertLangToLocale(`${startYear + 9}`, lang)
      );
    }

    const handleNextYear = () => {
      switch (view) {
        case 'year':
          let startYear = Math.floor(Math.min(selectedYear + 10, MAX_NP_YEAR) / 10) * 10;
          rangeNavigationTextHelper(startYear);
          setSelectedYear(startYear);
          break;
        default:
          const newYear = Math.min(selectedYear + 1, MAX_NP_YEAR);
          setSelectedYear(newYear);
          onNextYear?.(newYear),
            setNavigationText(navigationTextHelper(newYear, selectedMonth, view, lang));
          break;
      }
    };
    const handlePrevYear = () => {
      switch (view) {
        case 'year':
          let startYear = Math.floor(Math.max(selectedYear - 10, MIN_NP_YEAR) / 10) * 10;
          startYear = Math.max(startYear, MIN_NP_YEAR);
          rangeNavigationTextHelper(startYear);
          setSelectedYear(startYear);
          break;
        default:
          const newYear = Math.max(selectedYear - 1, MIN_NP_YEAR);
          setSelectedYear(newYear);
          setNavigationText(navigationTextHelper(newYear, selectedMonth, view, lang));
          onPrevYear?.(newYear);
          break;
      }
    };

    const handlePrevMonth = () => {
      const newMonth = Math.max(selectedMonth - 1, 0);
      setSelectedMonth(newMonth);
      setNavigationText(navigationTextHelper(selectedYear, newMonth, view, lang));
      onPrevMonth?.(months[lang][newMonth], newMonth);
    };

    const handleNextMonth = () => {
      const newMonth = Math.min(selectedMonth + 1, 11);
      setSelectedMonth(newMonth);
      setNavigationText(navigationTextHelper(selectedYear, newMonth, view, lang));
      onNextMonth?.(months[lang][newMonth], newMonth);
    };

    const validDecades = generateDecadesInRange(MIN_NP_YEAR, MAX_NP_YEAR);

    const handleNavigationClick = useCallback(() => {
      switch (view) {
        case 'month':
          setView('year');
          const startYear = Math.floor(selectedYear / 10) * 10;
          setNavigationText(
            convertLangToLocale(`${startYear}`, lang) +
              '-' +
              convertLangToLocale(`${startYear + 9}`, lang)
          );
          break;
        case 'year':
          setView('decade');
          const startDecade = Math.floor(selectedYear / 100) * 100;
          setNavigationText(
            convertLangToLocale(`${startDecade}`, lang) +
              '-' +
              convertLangToLocale(`${startDecade + 89}`, lang)
          );
          break;
        default:
          setView('month');
          setNavigationText(convertLangToLocale(`${selectedYear}`, lang));
          break;
      }
    }, [view, lang]);

    const handleYearSelect = (year: number) => {
      setView('month');
      setSelectedYear(year);
      setNavigationText(convertLangToLocale(`${year}`, lang));
      onYearSelect?.(year);
    };

    const handleDecadeSelect = (decadeStart: number) => {
      setView('year');
      setSelectedYear(decadeStart);
      setNavigationText(
        convertLangToLocale(`${decadeStart}`, lang) +
          '-' +
          convertLangToLocale(`${decadeStart + 9}`, lang)
      );
    };
    const handleMonthSelect = (monthIndex: number) => {
      const monthName = months[lang][monthIndex];
      setView('');
      setSelectedMonth(monthIndex);
      setNavigationText(`${`${monthName}`} ${convertLangToLocale(`${selectedYear}`, lang)}`);
      onMonthSelect?.(monthName, monthIndex);
    };
    const handleSelecteDate = (date: NepaliDate, ref: HTMLDivElement, event: DateEventType) => {
      onChange(date);
      setSelectedDate(date);
      onCellClick?.(date, ref, event);
    };

    const renderMonthView = useCallback(
      () => (
        <div className="p-4 grid grid-cols-3 place-content-center ">
          {months[lang].map((month, index) => (
            <div
              key={index}
              className="cursor-pointer flex items-center justify-center h-[60px] text-center hover:bg-muted font-medium"
              onClick={() => handleMonthSelect(index)}
            >
              {month}
            </div>
          ))}
        </div>
      ),
      [lang, selectedYear]
    );

    const renderYearView = useCallback(
      () => (
        <div className="p-4 grid grid-cols-3 place-content-center">
          {Array.from({ length: 10 }).map((_, index) => {
            const year = selectedYear - (selectedYear % 10) + index;
            return (
              <div
                key={year}
                className="cursor-pointer flex items-center justify-center h-[60px] text-center hover:bg-muted font-medium"
                onClick={() => handleYearSelect(year)}
              >
                {convertLangToLocale(year.toString(), lang)}
              </div>
            );
          })}
        </div>
      ),
      [selectedYear, lang]
    );

    const renderDecadeView = useCallback(
      () => (
        <div className="p-4 grid grid-cols-3 place-content-center">
          {validDecades.map((decadeStart, index) => {
            return (
              <div
                key={decadeStart}
                className="cursor-pointer flex items-center justify-center h-[60px] text-center hover:bg-muted font-medium"
                onClick={() => handleDecadeSelect(decadeStart)}
              >
                {convertLangToLocale(`${decadeStart}`, lang)} -{' '}
                {convertLangToLocale(`${decadeStart + 9}`, lang)}
              </div>
            );
          })}
        </div>
      ),
      [selectedYear, lang]
    );

    const renderDateView = useCallback(() => {
      return (
        <div>
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
              const today =
                selectedDate?.toJsDate()?.toDateString() == date?.toJsDate().toDateString();
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
                    {convertLangToLocale(date.getDate().toString(), lang)}
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
        </div>
      );
    }, [selectedMonth, selectedYear, lang, showDateEvent, theme]);

    const renderView = useCallback(() => {
      switch (view) {
        case 'month':
          return renderMonthView();
        case 'year':
          return renderYearView();
        case 'decade':
          return renderDecadeView();
        default:
          return renderDateView();
      }
    }, [view, renderMonthView, renderYearView, renderDecadeView, renderDateView]);

    return (
      <div
        ref={ref}
        className={cn(
          'min-w-[400px]  max-w-[600px]  overflow-hidden w-full border border-collapse shadow-md bg-white rounded-md',
          wrapperClass
        )}
      >
        <div className={cn('flex justify-between h-[50px]', theme?.header)}>
          <div className="w-[20%] flex justify-between items-center">
            {
              <button
                disabled={view == 'decade'}
                onClick={handlePrevYear}
                className="hover:bg-muted text-center flex flex-1 justify-center items-center  w-1/2 h-full "
              >
                <MdOutlineKeyboardDoubleArrowLeft />
              </button>
            }
            {view == '' && (
              <button
                onClick={handlePrevMonth}
                className="hover:bg-muted text-center flex justify-center items-center  w-1/2 h-full "
              >
                <MdKeyboardArrowLeft className="hover:bg-muted" />
              </button>
            )}
          </div>
          <div
            onClick={handleNavigationClick}
            className="w-[55%] select-none flex justify-center  items-center text-center hover:bg-muted cursor-pointer"
          >
            {navigationText}{' '}
          </div>
          <div className="w-[20%] flex justify-between items-center">
            {view == '' && (
              <button
                onClick={handleNextMonth}
                className="hover:bg-muted text-center flex justify-center items-center  w-1/2 h-full "
              >
                <MdKeyboardArrowRight />
              </button>
            )}
            {
              <button
                disabled={view == 'decade'}
                onClick={handleNextYear}
                className="hover:bg-muted flex-1 text-center flex justify-center items-center  w-1/2 h-full "
              >
                <MdOutlineKeyboardDoubleArrowRight className="hover:bg-muted" />
              </button>
            }
          </div>
        </div>
        {renderView()}
      </div>
    );
  }
);

export default Calendar;
