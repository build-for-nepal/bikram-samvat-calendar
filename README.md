# Calendar Component

The `Calendar` component is a Nepali calendar built with React, designed to allow users to select dates in the Nepali date system. This component provides functionalities such as navigating between months and years, selecting a date, and displaying the current date.

## Features

- **Month and Year Selection**: Users can select different months and years using dropdowns.
- **Date Selection**: Users can click on dates to select them.
- **Display Today**: A button to quickly reset the calendar to the current date.
- **Customizable Theme**: Supports theming for easy integration into different applications.

## Installation

To use the `Calendar` component, ensure you have React installed in your project. You can then import the component as follows:

```bash
npm install bikram-samvat-calendar 
```

# Usage
# Calender Component
 **Here's a basic example of how to use the Calendar component in your application:**
 ```bash 
 import React, { useState } from 'react';
import Calendar from 'bikram-samvat-calendar';
import { NepaliDate } from 'bikram-samvat-calendar/types/Calendar';



function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date:NepaliDate) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };
  return (
    <div>
      <h1>My Nepali Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
         onPrevYear={(year) => {
            console.log(year, 'year');
          }}
          onNextYear={(year) => {
            console.log(year, 'year');
          }}
          onMonthSelect={(name, index) => {
            console.log({ name, index });
          }}
          onCellClick={(date, ref) => {
              ref.style.color = 'red';
          }}
        theme={{ 
          header: 'bg-gray-200', 
          dayHeader: 'text-gray-600', 
          dateGrid: 'bg-white', 
          today: 'bg-blue-200',
          selected: 'bg-green-500',
          hover: 'hover:bg-gray-100'
        }}
      />
    </div>
  );
}

export default App;

 ```

## Props

| Prop         | Type     | Default       | Description                                                |
|--------------|----------|---------------|------------------------------------------------------------|
| `wrapperClass` | `string` | `''`         | Additional CSS classes for the wrapper element.           |
| `theme`      | `object` | `{}`         | Theme customization for different parts of the calendar.   |
| `onChange`   | `function` | `(date:NepaliDate) => {}`   | Callback function triggered when a date is selected. it will give NepaliDate Object      |
| `value`      | `Date`   | `new Date()`  | The currently selected date (in JavaScript Date format).   |
| `ref` | `React.React.MutableRefObject<HTMLDivElement>`   |     `undefined`    | Use this calendarRef for custom logic      |
 # Nepali Date Picker Component
   
   ```bash 
   import React, { useState } from "react";
import { DatePicker } from "bikram-samvat-calendar";
import { NepaliDate } from 'bikram-samvat-calendar/types/Calender';

function App() {
  const [date, setDate] = useState<NepaliDate>();
  const onChange = (selectedDate: NepaliDate) => {
    setDate(selectedDate);
  };
  const customeEventsDate = [
            {
              year:"2081",
              month: "Ashwin",
              date:1,
              eventName:"Custome Date"
            }
          ];

  return (
    <div style={{
     display: "flex", 
     justifyContent: "center",
     height: "100vh", 
     gap:"20px",
     alignItems: "center",
     flexDirection: "column"
       }}>
      <h1>Nepali Date Picker</h1>
      <p>Selected Date: {date?.toJsDate().toDateString()}</p>
      <p>Formatted Date: {date?.format("ddd DD, MMMM YYYY", "np")}</p>
      <DatePicker eventDates={customeEventsDate} value={date?.toJsDate()} onChange={onChange} />
    </div>
  );
}

export default App;

   ```
## DatePicker Props

| Prop           | Type                                | Default                | Description                                                                                   |
|----------------|-------------------------------------|------------------------|-----------------------------------------------------------------------------------------------|
| `inputStyle`   | `string`                            | `''`                   | Additional CSS classes for styling the input element.                                        |
| `onChange`     | `(data: NepaliDate) => void`      |                        | Callback function triggered when a date is selected.                                         |
| `value`        | `Date | undefined`                 | `undefined`            | The currently selected date in JavaScript Date format.                                       |
| `placeholder`  | `string`                            | `'Select a Date'`     | Placeholder text for the input field when no date is selected.                               |
| `calenderProps`|       wrapperClass,theme    | default  |         props mentioned in Calendar Component
| `wrapperClass`|       `string`   | empty  |        |  Additional CSS classes for the wrapper element. 
| `calendarRef` | `React.React.MutableRefObject<HTMLDivElement>`   |     `undefined`    | Use this calendarRef for custom logic      |



## Comman Props these props valid for both DatePicker and Calendar Component

| Prop         | Type     | Default       | Description                                                |
|--------------|----------|---------------|------------------------------------------------------------|
| `lang` | `en|np`   |     `np`    | For changing style nepali lang to english.           |

| `onPrevYear` |  `(year:number)=>void` | `''` | The currently toggle  year      |
| `showDateEvent` |  `boolean` | `true` | Showing historic date events  |
| `onNextYear` |  `(year:number)=>void` | `''` | The currently toggle year  |
| `onMonthSelect` |  `(name:string,monthIndex:number)=>void` | `''` | The currently selected month with name and index |
| `onPrevMonth` |  `(name:string,monthIndex:number)=>void` | `''` | The currently navigate month with name and index |
| `onNexMonth` |  `(name:string,monthIndex:number)=>void` | `''` | The currently navigated month with name and index |
| `onCellClick` |  `(date:NepaliDate,cellRef:React.React.MutableRefObject<HTMLDivElement>,event:DateEventType)=>void` | `''` | The  clicked month cell date  and Cell ref for custom logic|
| `eventDates` |  `CustomeDateEvent[]` | `''` | for the showing custome dates in calendar



## Acknowledgments

We would like to thank the following  packages that have contributed to this project:

- **[nepali-date-convert](https://www.npmjs.com/package/nepali-date-converter)**: Converting date into NepaliDate like  Javascript Object  (visit package for more NepaliDate object methods)
- **[ad-bs-converter](https://github.com/techgaun/ad-bs-converter/blob/master/src/converter.js)**: For calculating days in month.


Your contributions make our work easier and enhance the overall quality of our project.



Feel free to copy and paste this Markdown content into your README file. If you need any changes or additions, let me know!



---
For more in-depth information about developing web application using the nepal-map package, please refer to the [Developer Guide](DEVELOPER.md).