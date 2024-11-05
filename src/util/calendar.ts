import nepalHisotricalDates from '../json/nepal.historical.data.json';
import NepaliDate from 'nepali-date-converter';
import { CustomeDateEvent, DateEventType, langType } from '../types/Calendar';

var adbs = require('ad-bs-converter');
interface GenerateDateReturnType {
  date: NepaliDate;
  currentMonth: boolean;
}

export const generateDate = (month: number, year: number): GenerateDateReturnType[] => {
  const bs2ad = adbs.bs2ad(`${year}/${Number(month) + 1}/01`);
  const ad2bs = adbs.ad2bs(`${bs2ad.year}/${bs2ad.month}/${bs2ad.day}`);
  const lastMonthDates = adbs.ad2bs(`${bs2ad.year}/${bs2ad.month - 1}/${bs2ad.day}`).en
    .totalDaysInMonth;
  const arrayOfDate: GenerateDateReturnType[] = [];

  // create prefix
  for (let i = ad2bs.en.dayOfWeek; i > 0; i--) {
    const currentDate = new NepaliDate(year, month - 1, lastMonthDates - (i - 1));
    arrayOfDate.push({
      currentMonth: false,
      date: currentDate,
    });
  }

  for (let i = 1; i < ad2bs.en.totalDaysInMonth + 1; i++) {
    const currentDate = new NepaliDate(year, month, i);
    arrayOfDate.push({
      currentMonth: true,
      date: currentDate,
    });
  }

  const remaining = 42 - arrayOfDate.length;
  for (let i = 1; i <= remaining; i++) {
    const nextMonth = new NepaliDate(year, month + 1, i);
    nextMonth.setDate(i);
    arrayOfDate.push({
      currentMonth: false,
      date: nextMonth,
    });
  }

  return arrayOfDate;
};

export const months = {
  np: [
    'बैशाख',
    'जेष्ठ',
    'आषाढ',
    'श्रावण',
    'भाद्र',
    'आश्विन',
    'कार्तिक',
    'मंसिर',
    'पौष',
    'माघ',
    'फाल्गुन',
    'चैत्र',
  ],
  en: [
    'Baishakh',
    'Jestha',
    'Ashadh',
    'Shrawan',
    'Bhadra',
    'Ashwin',
    'Kartik',
    'Mangsir',
    'Poush',
    'Magh',
    'Falgun',
    'Chaitra',
  ],
  monthsShortName: ['बै', 'जे', 'आषा', 'श्रा', 'भा', 'आश', 'का', 'मं', 'पौ', 'मा', 'फा', 'चै'],
};

export const npNums = {
  0: '०',
  1: '१',
  2: '२',
  3: '३',
  4: '४',
  5: '५',
  6: '६',
  7: '७',
  8: '८',
  9: '९',
};

export const daysObj = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  np: ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
};
export const convertLangToLocale = (num: string, lang: 'en' | 'np') => {
  if (lang == 'en') {
    return num;
  }
  return num
    .split('')
    .map((num) => npNums[num])
    .join('');
};

export const parseDate = (date: Date | NepaliDate) => {
  if (!date) {
    return undefined;
  }
  if (date instanceof Date) {
    return new NepaliDate(date);
  } else if (date instanceof NepaliDate) {
    return new NepaliDate(date.toJsDate());
  }
  return undefined;
};

export const getDateEvent = (
  date: NepaliDate,
  userEvents: CustomeDateEvent[] = []
): DateEventType => {
  let currentMonth = months.en[date.getMonth()];
  let currentDate = date.getDate();
  let currentYear = date.getYear();
  let event = nepalHisotricalDates[`${currentMonth} ${currentDate}`] as DateEventType;

  let userCustomEventObj = createDateEventObj(userEvents);

  if (Object.keys(userCustomEventObj).length) {
    event = userCustomEventObj[`${currentYear}_${currentMonth}_${currentDate}`] as DateEventType;
  }
  return event;
};

function createDateEventObj(userEvents: CustomeDateEvent[]) {
  let eventObject = {};
  for (let i = 0; i < userEvents.length; i++) {
    let event = userEvents[i];
    let month = typeof event.month === 'number' ? months.en[event.month] : event.month;
    let year = event.year;
    let date = event.date;

    let key = `${year}_${month}_${date}`;
    eventObject[key] = {
      name: {
        np: event.eventName,
        en: event.eventName,
      },
      description: {
        np: event.description,
        en: event.description,
      },
    };
  }
  return eventObject;
}

export const generateDecadesInRange = (startYear: number, endYear: number) => {
  const decades = [];
  let startDecade = Math.floor(startYear / 10) * 10;
  const endDecade = Math.floor(endYear / 10) * 10;

  while (startDecade <= endDecade) {
    decades.push(startDecade);
    startDecade += 10;
  }
  return decades;
};

export const navigationTextHelper = (
  newYear: number,
  selectedMonth: number,
  view: string,
  lang: langType
) => {
  let text = `${convertLangToLocale(newYear.toString(), lang)}`;
  if (view == '') {
    text = `${months[lang][selectedMonth]} ${convertLangToLocale(newYear.toString(), lang)}`;
  }

  return text;
};
