import React, { useRef, useState } from 'react';
import { Calendar } from 'bikram-samvat-calendar';
import { NepaliDate } from 'bikram-samvat-calendar/types/Calender';
import { copyToClipboard } from '../utils';

export default function CalendarComponent() {
  const [nepaliDate, setNepaliDate] = useState<NepaliDate>();

  const handleChangeDate = (date: NepaliDate) => {
    setNepaliDate(date);
  };
  const [lang, setLang] = useState<'np' | 'en'>('np');

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as 'en');
  };

  const calendarRef = useRef<HTMLDivElement>()

  const renderFormats = () => {
    if (!nepaliDate) return null;

    const formats = [
      {
        label: 'YYYY/MM/DD',
        value: nepaliDate.format('YYYY/MM/DD'),
        method: "format('YYYY/MM/DD')",
      },
      {
        label: 'YYYY MM DD',
        value: nepaliDate.format('YYYY MM DD'),
        method: "format('YYYY MM DD')",
      },
      { label: 'YYYY', value: nepaliDate.format('YYYY'), method: "format('YYYY')" },
      {
        label: 'ddd DD, MMMM YYYY',
        value: nepaliDate.format('ddd DD, MMMM YYYY'),
        method: "format('ddd DD, MMMM YYYY')",
      },
      {
        label: 'Today is ddd DD, MMMM YYYY',
        value: nepaliDate.format('To\\day is ddd DD, MMMM YYYY'),
        method: "format('To\\day is ddd DD, MMMM YYYY')",
      },
      {
        label: 'DD/MM/YYYY (np)',
        value: nepaliDate.format('DD/MM/YYYY', 'np'),
        method: "format('DD/MM/YYYY', 'np')",
      },
      { label: 'dd (np)', value: nepaliDate.format('dd', 'np'), method: "format('dd', 'np')" },
      {
        label: 'ddd DD, MMMM YYYY (np)',
        value: nepaliDate.format('ddd DD, MMMM YYYY', 'np'),
        method: "format('ddd DD, MMMM YYYY', 'np')",
      },
    ];

    return (
      <div className="formats-container">
        <h3>Selected Date Formats:</h3>
        {formats.map(({ label, value, method }) => (
          <div className="format-item" key={label}>
            <strong>{label}:</strong> {value} <br />
            <small>
              {' '}
              Method: <code>{method}</code>
            </small>
            <button className="copy-button" onClick={() => copyToClipboard(value)}>
              Copy
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-component">
      <div>
        <h2>Language</h2>
        <select className="select" value={lang} onChange={handleLangChange}>
          <option value="np">Nepali</option>
          <option value="en">English</option>
        </select>
      </div>
      <h2>Choose a Nepali Date:</h2>
      <div>
        <Calendar
          lang={lang}
          wrapperClass="mx-auto "
          value={nepaliDate || new Date()}
          onChange={handleChangeDate}
        />
      </div>
      {renderFormats()}
    </div>
  );
}
