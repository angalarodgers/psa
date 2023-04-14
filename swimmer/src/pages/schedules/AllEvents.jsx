import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../context/authContext";

const AllEvents = () => {
  const { currentUser } = useContext(AuthContext);
  const [dtAll, setDtAll] = useState([]);
  const { isLoading, error, data } = useQuery("ordersAll", () =>
    makeRequest.get("/events/getEvents").then((res) => {
      setDtAll(res.data);
      return res.data;
    })
  );

  const filteredEvents = dtAll.filter((event) => {
    return event.student_name === currentUser.username;
  });

  const eventsByDate = Object.values(
    filteredEvents.reduce((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {})
  ).map((eventList) =>
    eventList.sort((a, b) => {
      return (
        new Date(`1970-01-01T${a.startTime}`) -
        new Date(`1970-01-01T${b.startTime}`)
      );
    })
  );

  const myfilteredData = eventsByDate
    .sort((a, b) => {
      const dateA = new Date(`${a[0].date}T${a[0].startTime}`);
      const dateB = new Date(`${b[0].date}T${b[0].startTime}`);
      return dateA - dateB;
    })
    .flat();
  return (
    <div className="card">
      <div className="card-body px-0">
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
              {error
                ? "Something Went Wring"
                : isLoading
                ? "Loading"
                : myfilteredData.map((event) => (
                    <DailyEventTR event={event} key={event.id} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
