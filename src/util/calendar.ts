import dayjs from 'dayjs';

var adbs = require('ad-bs-converter');

export const generateDate = (month: number, year: number, iToday: number = 1) => {
  const bs2ad = adbs.bs2ad(`${year}/${month + 1}/01`);

  const ad2bs = adbs.ad2bs(`${bs2ad.year}/${bs2ad.month}/${bs2ad.day}`);
  const lastMonthDates = adbs.ad2bs(`${bs2ad.year}/${bs2ad.month - 1}/${bs2ad.day}`).en
    .totalDaysInMonth;

  const arrayOfDate = [];
  for (let i = ad2bs.en.dayOfWeek; i > 0; i--) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastMonthDates - (i - 1),
    });
  }

  for (let i = 1; i < ad2bs.en.totalDaysInMonth + 1; i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: i,
      today: i === iToday,
    });
  }

  const remaining = 42 - arrayOfDate.length;
  for (let i = 1; i <= remaining; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: i,
    });
  }

  return arrayOfDate;
};

export const months = {
  monthsName: [
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

export const nepaliDaysName = [
  'आइतबार',
  'सोमबार',
  'मंगलबार',
  'बुधबार',
  'बिहिबार',
  'शुक्रबार',
  'शनिबार',
];

export const enToNpNum = (num: string) => {
  return num
    .split('')
    .map((num) => npNums[num])
    .join('');
};

export const convertToDateObj = (year: string, month: string, date: number) => {
  const bs2ad = adbs.bs2ad(`${year}/${month + 1}/${date}`);
  return {
    enDate: dayjs()
      .year(bs2ad.year)
      .month(bs2ad.month - 1)
      .date(bs2ad.day),
    npDate: `${year}/${month}/${date}`,
  };
};
