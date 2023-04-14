import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AddMultipleEvents = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleSelect = (date) => {
    const index = selectedDates.findIndex(
      (selectedDate) => selectedDate.getTime() === date.getTime()
    );

    if (index === -1) {
      setSelectedDates([...selectedDates, date]);
    } else {
      setSelectedDates([
        ...selectedDates.slice(0, index),
        ...selectedDates.slice(index + 1),
      ]);
    }
  };

  const handleRangeSelect = (date) => {
    const rangeStart = selectedDates.length ? selectedDates[0] : date;
    const rangeEnd = date;
    const range = [];

    for (
      let d = new Date(rangeStart);
      d <= rangeEnd;
      d.setDate(d.getDate() + 1)
    ) {
      range.push(new Date(d));
    }

    setSelectedDates(range);
  };

  return (
    <Calendar
      selectRange={true}
      value={selectedDates}
      onChange={selectedDates.length === 1 ? handleRangeSelect : handleSelect}
    />
  );
};

export default AddMultipleEvents;
