import React from 'react';
import Calendar from 'react-calendar';
import './History.css'; // Import the external CSS file
import dates from './data/dates.json';


// Year, month, day
const MinDate = new Date(dates.start_date); // the day that the user joined the app
const MaxDate = new Date();
const ActiveDates = dates.active_dates;

function History() {
    const isActiveDate = (date) => {
        return ActiveDates.includes(date.toISOString().slice(0, 10));
    };


    return (
        <div>
            <Calendar
                allowPartialRange={true}
                minDate={MinDate}
                maxDate={MaxDate}
                tileClassName={({ date }) => (isActiveDate(date) ? 'active-date' : '')}
            />
        </div>
    );
}



export default History;