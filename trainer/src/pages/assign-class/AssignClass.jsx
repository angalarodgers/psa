import React, { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import DateDisplay from "./DateDisplay";
import EventClients from "./EventClients";
import toast, { Toaster } from "react-hot-toast";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AssignClass = () => {
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("id");
  const [searchValue, setSearchValue] = useState("");
  const [inputs, setInputs] = useState({
    userId: "",
    class: eventId,
    userType: "",
  });

  const [ents, setEvts] = useState({});
  const [userss, setUserss] = useState([]);
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery("fetchEvent", () =>
    makeRequest.get("/events/getEvent/" + eventId).then((res) => {
      setEvts(res.data);

      return res.data;
    })
  );

  const { uisLoading, uerror, udata } = useQuery("fetchUsers", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      setUserss(res.data);

      return res.data;
    })
  );

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const matchingUser = userss.find(
    (user) =>
      user.email.includes(searchValue) || user.username.includes(searchValue)
  );

  const handleChangeAssign = () => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAssign = async (e, user_id) => {
    console.log(user_id);
    e.preventDefault();
    if (user_id <= 0) {
      toast.error("Customer Not Selected!");
    } else {
      try {
        const res = await makeRequest.post("/users/assignToEvent", [
          eventId,
          user_id,
        ]);
        console.log(res);
        if (res.status === 200) {
          toast.success(res.data);
          toast.success("Assigned Successfully!");
          window.location.reload(false);
        }
      } catch (err) {
        toast.error(err.response.data);
      }
    }
  };
  return (
    <div className="row">
      <div className="col-sm-12">
        <h5>Assign swimmers to this Class</h5>
        <p>
          <span>
            <strong>{ents.title}</strong>,{" "}
            <small>
              of age group: <strong>{ents.ageGroup}</strong>{" "}
            </small>{" "}
            <br />
            <small>scheduled on :</small>{" "}
            <strong>
              {" "}
              <DateDisplay date={ents.date} />
            </strong>
            , <small>at</small> <strong>{ents.startTime}</strong>, <br />
            <small>number of students: </small>{" "}
            <strong>{ents.noStudents}</strong> &nbsp;
            <small>number of trainers: </small>{" "}
            <strong>{ents.noTrainers}</strong>
          </span>
        </p>
      </div>

      <div className="col-sm-6 card-frame">
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">User Email</label>
            <input
              className="form-control"
              placeholder="name@example.com"
              type="text"
              id="search"
              value={searchValue}
              onChange={handleChange}
            />
          </div>

          <div className="form-group d-flex justify-content-center">
            {matchingUser && (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={(e) => handleAssign(e, matchingUser.id)}
              >
                Assign
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="col-sm-3 card-frame">
        <h5>User to add</h5>
        {matchingUser && (
          <div>
            <p>
              <input
                type="hidden"
                value={matchingUser.id}
                onChange={handleChangeAssign}
                name="userId"
                readOnly
              />
            </p>
            <p>Email: {matchingUser.email}</p>
            <p>Username: {matchingUser.username}</p>
            <p>User Type: {matchingUser.userType}</p>
            <p>Age Group: {matchingUser.userAge}</p>
          </div>
        )}
      </div>
      <div className="col-sm-3 card-frame">
        <h5>Trainer Assigned</h5>
        <span>
          {" "}
          <strong>{ents.trainer}</strong>
        </span>
      </div>
      <div className="col-sm-12 card">
        <EventClients eventId={eventId} />
      </div>
      <Toaster />
    </div>
  );
};

export default AssignClass;
