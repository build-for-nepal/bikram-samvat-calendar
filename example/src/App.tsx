import React, { useMemo, useState } from 'react';
import './App.css';
import 'bikram-samvat-calendar/index.css';
import CalendarComponent from './component/calendar';
import DatePickerComp from './component/date-picker';
function App() {
  const [selectedExample,setSelectedExample]= useState('calendar')
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExample(e.target.value)
  };
  const Comp = useMemo(()=>{
    switch(selectedExample){
      case 'date-picker':
        return  <DatePickerComp />
      case 'calendar':
        return <CalendarComponent/>
        default:
          return null;
    }

  },[selectedExample])
  return (
    <div>
      <div  style={{margin:10}} className="date-picker-container">
        <h2>Select Example</h2>
        <select className="select" value={selectedExample} onChange={handleSelect}>
          <option value="date-picker">Date Picker</option>
          <option value="calendar"> Calendar</option>
        </select>
        <div>
         {Comp}
        </div>
      </div>
    </div>
  );
}

export default App;
