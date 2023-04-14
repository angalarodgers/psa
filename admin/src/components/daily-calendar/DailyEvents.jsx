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
import DailyEventsTR2 from "./DailyEventsTR2";

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

  myfilteredData.sort((a, b) => {
    const timeA = new Date(`2000-01-01T${a.startTime}`);
    const timeB = new Date(`2000-01-01T${b.startTime}`);
    return timeA - timeB;
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mb-2">
          <div className="card">
            <div className="card-body px-0">
              <div className="table-responsive">
                <h6 className="p-2">Scheduled Events</h6>
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
                        Group
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
        </div>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body px-0">
              <div className="table-responsive">
                <h6 className="p-2">Passed Classes</h6>
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
                        Group
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
                          <DailyEventsTR2 event={event} key={event.id} />
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyEvents;
