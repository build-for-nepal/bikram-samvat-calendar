import { DatePicker } from 'bikram-samvat-calendar';
import NepaliDate from 'nepali-date-converter';
import React, { useState } from 'react';

export default function DatePickerComp() {
  const [date, setDate] = useState<NepaliDate>();
  const onChange = (date: NepaliDate) => {
    setDate(date);
  };
  const renderOutput = () => {
    if (!date) return null;
    return (
      <div className="formats-container">
        <h3>Selected Date Formats:</h3>
        <p>{date?.toJsDate().toDateString()}</p>
        <p>{date?.format('ddd DD, MMMM YYYY', 'np')}</p>
      </div>
    );
  };

  const [lang,setLang] = useState<'np'|'en'>('np')

  const handleLangChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
      setLang(e.target.value  as 'en')
  }

  return (
    <div className="calendar-component">
      <div className="mx-auto">
        <h1 className="heading">Date Picker</h1>
        <div>
        <div>
            <h2>Language</h2>
            <select className='select' value={lang} onChange={handleLangChange}>
                <option value='np'>Nepali</option>
                <option value='en'>English</option>
            </select>
         </div>
          <DatePicker lang={lang} wrapperClass="w-50 mx-auto" value={date?.toJsDate()} onChange={onChange} />
          {renderOutput()}
        </div>
      </div>
    </div>
  );
}
