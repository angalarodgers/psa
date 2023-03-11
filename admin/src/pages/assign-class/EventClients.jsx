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
import EventCustomersTR from "./EventCustomersTR";

const EventClients = ({ eventId }) => {
  const [ecdtAll, setEcDtAll] = useState([]);
  const { ecisLoading, ecerror, ecdata } = useQuery(
    "getEventAllCustomers",
    () =>
      makeRequest.get("/events/getEventCustomers/" + eventId).then((res) => {
        setEcDtAll(res.data);
        console.log(res.data);
        return res.data;
      })
  );
  return (
    <div className="card" style={{ heigh: "100vh" }}>
      <div className="table-responsive">
        <table className="table align-items-center mb-0">
          <thead>
            <tr>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Swimmer
              </th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Group
              </th>

              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Subscription Expiry Date
              </th>
              <th className="text-secondary opacity-7" />
            </tr>
          </thead>
          <tbody>
            {ecerror
              ? "Something Went Wring"
              : ecisLoading
              ? "Loading"
              : ecdtAll.map((customer) => (
                  <EventCustomersTR customer={customer} key={customer.id} />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventClients;
