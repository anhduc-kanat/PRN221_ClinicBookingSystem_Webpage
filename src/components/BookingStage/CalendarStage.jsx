import { Button } from 'antd';
import Calendar from 'react-calendar';
import React, { useState } from 'react';

import './StageStyle.css';

export default function CalendarStage() {
    const [selectedDate, setSelectedDate] = useState(null);

    const disabledDates = [
        new Date(2024, 5, 10),
        new Date(2024, 5, 15),
        new Date(2024, 5, 20),
        // Add more dates as needed
    ];

    const handleDisableDates = ({ date, view }) => {
        // Disable specific dates
        if (view === 'month') {
            return disabledDates.some(disabledDate =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
            );
        }
        return false;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleButtonClick = () => {
        if (selectedDate) {
            alert(`Selected date: ${selectedDate.toLocaleDateString()}`);
        } else {
            alert('No date selected');
        }
    };

    return (
        <div className="calendar">
            <Calendar
                locale='en'
                tileDisabled={handleDisableDates}
                onChange={handleDateChange}
            />
            <Button onClick={handleButtonClick} className="calendarButton">Confirm</Button>
        </div>
    )
}