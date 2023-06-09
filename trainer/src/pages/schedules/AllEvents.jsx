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

const AllEvents = () => {
  const [dtAll, setDtAll] = useState([]);
  const { isLoading, error, data } = useQuery("ordersAll", () =>
    makeRequest.get("/events/getEvents").then((res) => {
      setDtAll(res.data);
      return res.data;
    })
  );

  const myfilteredData = dtAll
    .filter((obj) => obj.date !== undefined) // remove objects with undefined id
    .sort((a, b) => a.date - b.date); // sort objects by id in ascending order
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
