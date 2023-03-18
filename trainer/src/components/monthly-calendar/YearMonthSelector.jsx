import React, { useState } from "react";
import "./YearMonthSelector.scss";

const YearMonthSelector = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    { id: 0, name: "January" },
    { id: 1, name: "February" },
    { id: 2, name: "March" },
    { id: 3, name: "April" },
    { id: 4, name: "May" },
    { id: 5, name: "June" },
    { id: 6, name: "July" },
    { id: 7, name: "August" },
    { id: 8, name: "September" },
    { id: 9, name: "October" },
    { id: 10, name: "November" },
    { id: 11, name: "December" },
  ];

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const isCurrentMonth = (monthId) => {
    return selectedMonth === monthId;
  };

  return (
    <div className="YearMonthSelector">
      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="year">Select a year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={selectedYear}
            onChange={handleYearChange}
            min="1900"
            max="2100"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="month">Select a month:</label>
          <select
            id="month"
            name="month"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {months.map((month) => (
              <option key={month.id} value={month.id}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-12">
          <div className="row">
            {months.map((month) => (
              <div className="col-sm-3">
                <li
                  key={month.id}
                  className={isCurrentMonth(month.id) ? "current-month" : ""}
                >
                  {month.name}
                </li>
              </div>
            ))}
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card p-4">
            <h3>Events in Jan</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearMonthSelector;
