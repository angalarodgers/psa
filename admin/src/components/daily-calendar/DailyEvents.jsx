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

const DailyEvents = () => {
  const [ents, setEvts] = useState([]);
  const { isLoading, error, data } = useQuery("fetchEvents", () =>
    makeRequest.get("/events/getEvents").then((res) => {
      setEvts(res.data);
      return res.data;
    })
  );

  const today = new Date().toLocaleDateString(); // get today's date in string format

  const filteredData = ents.filter((obj) => {
    const date = new Date(obj.date).toLocaleDateString(); // convert object's date to string format
    return date === today;
  });

  const myfilteredData = filteredData
    .filter((obj) => obj.startTime !== undefined) // remove objects with undefined id
    .sort((a, b) => a.startTime - b.startTime); // sort objects by id in ascending order
  return (
    <div className="card">
      <div className="card-body px-0">
        <div className="table-responsive">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Class
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Trainer
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Students
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Date/Time
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Progress
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

export default DailyEvents;
