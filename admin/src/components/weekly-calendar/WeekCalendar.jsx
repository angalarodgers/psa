import "./WeekCalendar.scss"; // Import the CSS file
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useQuery } from "react-query";
import DailyEventTR from "./DailyEventTR";

function WeekCalendar() {
  const [ents, setEvts] = useState([]);
  const [sd, setSd] = useState("");
  const { isLoading, error, data } = useQuery("fetchEvents", () =>
    makeRequest.get("/events/getEvents").then((res) => {
      setEvts(res.data);
      return res.data;
    })
  );

  const getDate = (e, date) => {
    if (date) {
      setSd(date);
      console.log(sd);
    }
  };

  const filteredData = ents.filter((obj) => {
    const date = new Date(obj.date).toLocaleDateString(); // convert object's date to string format
    return date === sd;
  });

  const myfilteredData = filteredData
    .filter((obj) => obj.indx !== undefined) // remove objects with undefined id
    .sort((a, b) => a.indx - b.indx); // sort objects by id in ascending order

  const year = new Date().getFullYear();

  const weeks = [];
  const firstDayOfYear = new Date(year, 0, 1);
  const numberOfDays =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
  for (let i = 0; i < numberOfDays; i += 7) {
    const weekStart = new Date(
      firstDayOfYear.getTime() + i * 24 * 60 * 60 * 1000
    );
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    weeks.push({ start: weekStart, end: weekEnd });
  }

  const [expandedWeek, setExpandedWeek] = useState(null);

  const toggleWeek = (index) => {
    if (index === expandedWeek) {
      setExpandedWeek(null);
    } else {
      const week = weeks[index];
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(week.start.getTime() + i * 24 * 60 * 60 * 1000);
        weekDates.push(date);
      }
      setExpandedWeek({ index, dates: weekDates });
    }
  };

  const today = new Date();

  return (
    <div className="week-calendar">
      <h2>Weeks of {year}</h2>
      <div className="row">
        <div
          className="col-sm-3"
          style={{ height: "500px", overflow: "scroll" }}
        >
          {weeks.map((week, index) => (
            <div
              key={index}
              className={`week ${
                week.start <= today && today <= week.end ? "current-week" : ""
              } ${index === expandedWeek?.index ? "expanded" : ""}`}
              onClick={() => toggleWeek(index)}
            >
              <div className="week-header">
                <div className="week-number">Week {index + 1}</div>
                <div className="week-dates">
                  {week.start.toLocaleDateString()} -{" "}
                  {week.end.toLocaleDateString()}
                </div>
              </div>
              {index === expandedWeek?.index && (
                <div className="dates">
                  {expandedWeek.dates.map((date, i) => (
                    <div
                      key={i}
                      className="date"
                      onClick={(e) => getDate(e, date.toLocaleDateString())}
                    >
                      {date.toLocaleDateString(undefined, { weekday: "long" })}
                      <br />
                      <a href="#"> {date.toLocaleDateString()}</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="col-sm-9">
          <div className="card">
            <div className="card-body px-2">
              <strong> {sd && <span>Selected Date: {sd}</span>}</strong>
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Event ID
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Trainer
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Students
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0
                      ? error
                        ? "Something Went Wring"
                        : isLoading
                        ? "Loading"
                        : myfilteredData.map((event) => (
                            <>
                              <DailyEventTR event={event} key={event.id} />
                            </>
                          ))
                      : `No Event on Date: ${sd}`}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekCalendar;
