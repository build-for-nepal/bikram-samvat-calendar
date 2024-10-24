var adbs = require('ad-bs-converter');

export const generateDate = (month: number, year: number, iToday: number = 1) => {
  const bs2ad = adbs.bs2ad(`${year}/${month + 1}/01`);

  const db2bs = adbs.ad2bs(`${bs2ad.year}/${bs2ad.month}/${bs2ad.day}`);

  const prefixDays = shortNepaliDaysName.indexOf(db2bs.ne.strShortDayOfWeek);

  const arrayOfDate = [];

  for (let i = 0; i < prefixDays; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: '',
    });
  }

  for (let i = 1; i <= db2bs.en.totalDaysInMonth; i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: i,
      today: false,
    });
  }

  return arrayOfDate;
};

export const enMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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
export const shortNepaliDaysName = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];

export const enToNpNum = (num: string) => {
  return num
    .split('')
    .map((num) => npNums[num])
    .join('');
};
