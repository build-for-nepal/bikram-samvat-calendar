# Developer Guide for Calendar Component

This guide provides detailed instructions on how to implement and customize the `Calendar` and `DatePicker` components from the `bikram-samvat-calendar` package in your React applications.

## Prerequisites

Before you begin, ensure that you have:

- A working React application.
- Node.js and npm installed on your machine.

## Installation

To add the `bikram-samvat-calendar` package to your project, run the following command:

```bash
npm install bikram-samvat-calendar
```



# Importing Components
 ### Calendar Component
 To use the Calendar component, import it in your desired file:

```bash
import Calendar from 'bikram-samvat-calendar';
import { NepaliDate } from 'bikram-samvat-calendar/types/Calendar';
```

### DatePicker Component
Similarly, import the DatePicker component as follows:
```bash
import Calendar from 'bikram-samvat-calendar';
import { NepaliDate } from 'bikram-samvat-calendar/types/Calendar';
```

# Using the Calendar Component
## Basic Usage
Here’s a basic example demonstrating how to implement the Calendar component:

```bash
import React, { useState } from 'react';
import Calendar from 'bikram-samvat-calendar';
import { NepaliDate } from 'bikram-samvat-calendar/types/Calendar';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: NepaliDate) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };

  return (
    <div>
      <h1>My Nepali Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        theme={{
          header: 'bg-gray-200',
          dayHeader: 'text-gray-600',
          dateGrid: 'bg-white',
          today: 'bg-blue-200',
          selected: 'bg-green-500',
          hover: 'hover:bg-gray-100',
        }}
      />
    </div>
  );
}

export default App;

```


# Handling Events
You can handle various events, such as year navigation, month selection, and cell clicks:

```bash 
<Calendar
  onChange={handleDateChange}
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
    ref.style.color = 'red'; // Example of changing cell color
  }}
/>

```

# Customizing Themes

The `theme` prop allows you to customize the appearance of the calendar. You can pass an object with class names to style different parts:



```bash 
theme={{
  header: 'bg-gray-200',
  dayHeader: 'text-gray-600',
  dateGrid: 'bg-white',
  today: 'bg-blue-200',
  selected: 'bg-green-500',
  hover: 'hover:bg-gray-100',
}}

```

# Using the DatePicker Component

## Basic Usage
Here’s how to implement the DatePicker component:

```bash 
import React, { useState } from "react";
import { DatePicker } from "bikram-samvat-calendar";

function App() {
  const [date, setDate] = useState();

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div>
      <h1>Nepali Date Picker</h1>
      <DatePicker value={date?.toJsDate()} onChange={onChange} />
    </div>
  );
}

export default App;

```

# Displaying Selected Date
You can display the selected date using the toJsDate() method to convert it to a JavaScript Date object:

```bash 
<p>Selected Date: {date?.toJsDate().toDateString()} </p>
<p>Formatted Date: {date?.format("ddd DD, MMMM YYYY", "np")}</p>

```

# Styling the DatePicker
You can customize the input field using the inputStyle prop:

```bash 
<DatePicker value={date?.toJsDate()} onChange={onChange} inputStyle="border border-gray-400 p-2" />
```


# Common Props
Both the Calendar and DatePicker components share common props 




| Prop         | Type     | Default       | Description                                                |
|--------------|----------|---------------|------------------------------------------------------------|
| `lang` | `en|np`   |     `np`    | For changing style nepali lang to english.           |
| `calendarRef` | `React.React.MutableRefObject<HTMLDivElement>`   |     `undefined`    | Use this calendarRef for custom logic      |
| `onPrevYear` |  `(year:number)=>void` | `''` | The currently toggle  year      |
| `onNextYear` |  `(year:number)=>void` | `''` | The currently toggle year  |
| `onMonthSelect` |  `(name:string,monthIndex:number)=>void` | `''` | The currently selected month with name and index |
| `onCellClick` |  `(date:NepaliDate,cellRef:React.React.MutableRefObject<HTMLDivElement>)=>void` | `''` | The  clicked month cell date  and Cell ref for custom logic|


# Conclusion

The `bikram-samvat-calendar` package provides an easy and flexible way to implement Nepali date selection in your React applications. Customize the components as needed and handle events to integrate them seamlessly into your user interface.

For any issues or feature requests, feel free to open an issue on the repository.

---

Feel free to copy and save this as a `.md` file! Let me know if you need any further changes.
