import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Class from "./Class";
import { ClipLoader } from "react-spinners";
import { makeRequest } from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const getClasses = async () => {
  const response = await makeRequest.get("/events/getEvents");
  console.log(response.data);
  return response.data;
};

const Classes = () => {
  const [sortByDate, setSortByDate] = useState("");
  const [sortByTrainer, setSortByTrainer] = useState("");
  const [sortByStudent, setSortByStudent] = useState("");
  const [sortByAgeGroup, setSortByAgeGroup] = useState("");
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const { trainerLoading, trainererror, trainerdata } = useQuery(
    "GetMyAllTrainers",
    () =>
      makeRequest.get("/users/getTrainers").then((res) => {
        setTrainers(res.data);
      })
  );

  const { acisLoading, acerror, acdata } = useQuery("GetMyAllClients", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    })
  );
  const { data: classes, isLoading: messagesLoading } = useQuery(
    "messages",
    getClasses,
    {
      refetchInterval: 1000,
    }
  );

  const filteredData = (classes || []).filter((item) => {
    if (sortByDate && item.date !== sortByDate) {
      return false;
    }
    if (sortByTrainer && item.trainer != sortByTrainer) {
      return false;
    }
    if (
      sortByStudent &&
      !item.student_name.toLowerCase().includes(sortByStudent.toLowerCase())
    ) {
      return false;
    }

    if (sortByAgeGroup && item.ageGroup != sortByAgeGroup) {
      return false;
    }
    return true;
  });

  function sortUsers(users) {
    if (!users) {
      return [];
    }

    return users.sort((a, b) => {
      if (
        a.username.toLowerCase().startsWith("a") &&
        !b.username.toLowerCase().startsWith("a")
      ) {
        return -1;
      } else if (
        !a.username.toLowerCase().startsWith("a") &&
        b.username.toLowerCase().startsWith("a")
      ) {
        return 1;
      } else {
        return a.username.localeCompare(b.username);
      }
    });
  }

  sortUsers(users);
  sortUsers(trainers);

  return (
    <div className="row">
      <div className="row">
        <div className="row p-2">
          <div className="col-md-2">
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
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Sort By Swimmer</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={(e) => setSortByStudent(e.target.value)}
              >
                <option value="">--Select a Swimmer--</option>
                <option value="None">--None--</option>
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
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Sort By Swimmer</label>
              <input
                className="form-control"
                type="text"
                name=""
                id=""
                onChange={(e) => setSortByStudent(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Sort By Trainer</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={(e) => setSortByTrainer(e.target.value)}
              >
                <option value="">--Select a Trainer--</option>
                <option value="">--Remove This Filter--</option>
                <option value="None">--None--</option>
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
          <div className="col-md-2">
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
      </div>
      <div className="card bg-info">
        {messagesLoading ? (
          <ClipLoader />
        ) : (
          filteredData &&
          filteredData.map((event) => <Class event={event} key={event.id} />)
        )}
      </div>
    </div>
  );
};

export default Classes;
