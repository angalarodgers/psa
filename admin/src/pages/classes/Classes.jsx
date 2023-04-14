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
import { ClipLoader } from "react-spinners";

const getClasses = async () => {
  const response = await makeRequest.get("/events/getEvents");
  return response.data;
};

const Classes = () => {
  const [sortByDate, setSortByDate] = useState("");
  const [sortByTrainer, setSortByTrainer] = useState("");
  const [sortByStudent, setSortByStudent] = useState("");
  const [sortByAgeGroup, setSortByAgeGroup] = useState("");
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const { data: classes, isLoading: messagesLoading } = useQuery(
    "messages",
    getClasses,
    {
      refetchInterval: 1000,
    }
  );

  const { trainerLoading, trainererror, trainerdata } = useQuery(
    "GetMyAllTrainers",
    () =>
      makeRequest.get("/users/getTrainers").then((res) => {
        setTrainers(res.data);
      })
  );

  const { acisLoading, acerror, acdata } = useQuery("GetMyAllClients", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      setUsers(res.data);
    })
  );

  const filteredData = (classes || []).filter((item) => {
    if (sortByDate && item.date !== sortByDate) {
      return false;
    }
    if (sortByTrainer && item.trainer != sortByTrainer) {
      return false;
    }
    if (sortByStudent && item.student_name != sortByStudent) {
      return false;
    }

    if (sortByAgeGroup && item.ageGroup != sortByAgeGroup) {
      return false;
    }
    return true;
  });

  return (
    <div className="card">
      <div className="card-body px-0">
        <div className="row p-2">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Sort By Date</label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                value={sortByDate}
                onChange={(e) => setSortByDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Sort By Swimmer</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={(e) => setSortByStudent(e.target.value)}
              >
                <option value="">--Select a Swimmer--</option>
                {acisLoading ? (
                  <ClipLoader />
                ) : (
                  users.map((user) => (
                    <option key={user.id} value={user.username}>
                      {user.username}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Sort By Trainer</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={(e) => setSortByTrainer(e.target.value)}
              >
                <option value="">--Select a Trainer--</option>
                <option value="">--Remove This Filter--</option>
                {trainerLoading ? (
                  <ClipLoader />
                ) : (
                  trainers.map((user) => (
                    <option key={user.id} value={user.username}>
                      {user.username}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">
                Sort By Age Group
              </label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={(e) => setSortByAgeGroup(e.target.value)}
              >
                <option value="">--Select Age Group--</option>
                <option value={"Child"}>Child</option>
                <option value={"Adult"}>Adult</option>
              </select>
            </div>
          </div>
        </div>
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
                  Group
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {messagesLoading ? (
                <ClipLoader />
              ) : (
                filteredData.map((event) => (
                  <DailyEventTR event={event} key={event.id} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Classes;
