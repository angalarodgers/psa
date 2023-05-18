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
import DailyEventTR2 from "./DailyEventTR2";

const DailyEvents = () => {
  const { currentUser } = useContext(AuthContext);
  const [ents, setEvts] = useState([]);
  const { isLoading, error, data } = useQuery("fetchEvents", () =>
    makeRequest.get("/events/getEvents").then((res) => {
      setEvts(res.data);
      return res.data;
    })
  );

  const filteredEvents = ents.filter((event) => {
    return event.student_name === currentUser.username;
  });

  const today = new Date().toLocaleDateString(); // get today's date in string format

  const filteredData = filteredEvents.filter((obj) => {
    const date = new Date(obj.date).toLocaleDateString(); // convert object's date to string format
    return date === today;
  });

  const myfilteredData = filteredData
    .filter((obj) => obj.startTime !== undefined) // remove objects with undefined id
    .sort((a, b) => a.startTime - b.startTime); // sort objects by id in ascending order

  myfilteredData.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1;
    }
    if (a.startTime > b.startTime) {
      return 1;
    }
    return 0;
  });

  const now = new Date();

  for (const event of myfilteredData) {
    const endDateTime = new Date(`${event.date} ${event.endTime}`);
    const hasPassed = endDateTime < now;
    event.passed = hasPassed ? 1 : 0;
    console.log(
      `${event.title} has ${hasPassed ? "passed" : "not passed"} its end time.`
    );
  }

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <div className="card">
          <p className="p-2">Scheduled Classes</p>
          <div className="card-body px-0">
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Trainer
                    </th>

                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Date/Time
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
          <p className="p-2">Completed Classes</p>
          <div className="card-body px-0">
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Trainer
                    </th>

                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Date/Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {error
                    ? "Something Went Wring"
                    : isLoading
                    ? "Loading"
                    : myfilteredData.map((event) => (
                        <DailyEventTR2 event={event} key={event.id} />
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyEvents;
