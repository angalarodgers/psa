import React, { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useQuery } from "react-query";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

const getClients = async () => {
  const response = await makeRequest.get("/users/getCustomers");
  return response.data;
};

const getTrainers = async () => {
  const response = await makeRequest.get("/users/getTrainers");
  return response.data;
};

const getClasses = async (event_id) => {
  const response = await makeRequest.get("/events/getEvent/" + event_id);
  return response.data;
};

const EditClass = () => {
  const [searchParam] = useSearchParams();
  const event_id = searchParam.get("id");
  const [classes, setObject] = useState({});

  const { eventLoading, error, data } = useQuery(`ordersAll${event_id}`, () =>
    makeRequest.get("/events/getEvent/" + event_id).then((res) => {
      setObject(res.data);
      return res.data;
    })
  );

  const { data: events, isLoading: eventsLoading } = useQuery(
    ["messag", event_id],
    () => getClasses(event_id),
    {
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    if (classes) {
      setObject(classes);
      setId(classes.id);
      setTitle(classes.title);
      setDate(classes.date);
      setStartTime(classes.startTime);
      setEndTime(classes.endTime);
      setTrainer(classes.trainer);
      setStudentName(classes.student_name);
      setNoStudents(classes.noStudents);
    }
  }, [classes]);

  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [trainer, setTrainer] = useState("");
  const [studentName, setStudentName] = useState("");
  const [noStudents, setNoStudents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nusers, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const navigate = useNavigate();
  const { data: users, isLoading: messagesLoading } = useQuery(
    "users",
    getClients,
    {
      refetchInterval: 5000,
    }
  );

  const { trainerLoading, trainererror, trainerdata } = useQuery(
    `GetMyAllTrainers${event_id}`,
    () =>
      makeRequest.get("/users/getTrainers").then((res) => {
        console.log(res.data);
        setTrainers(res.data);
      })
  );

  const { acisLoading, acerror, acdata } = useQuery(
    `GetMyAllClients${event_id}`,
    () =>
      makeRequest.get("/users/getCustomers").then((res) => {
        setUsers(res.data);
      })
  );

  const handleUpdate = () => {
    setLoading(true);

    const newdate = new Date(`January 1, 2023 ${startTime}`);
    const start = newdate.toLocaleTimeString("en-US", { hour12: false });

    var end = null;
    if (endTime.endsWith("PM")) {
      // Remove "PM" from the time string
      end = endTime.slice(0, -2);
    } else {
      end = endTime.slice(0, -2);
    }

    console.log(end);
    const updatedObject = {
      id,
      title,
      date,
      start,
      end,
      trainer,
      student_name: studentName,
      noStudents,
    };
    makeRequest
      .put(`/events/updateClass/${event_id}`, updatedObject)
      .then((response) => {
        setLoading(false);
        toast.success("Object updated successfully!");
        navigate("../classes");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error updating object.");
        console.error(error);
      });
  };

  function convertTo24Hour(time) {
    const [hours, minutes] = time.split(":");
    const period = time.slice(-2); // extract AM/PM
    const isPM = period.toUpperCase() === "PM";

    let convertedHours = parseInt(hours, 10);
    if (isPM && convertedHours !== 12) {
      convertedHours += 12;
    } else if (!isPM && convertedHours === 12) {
      convertedHours = 0;
    }

    return `${convertedHours.toString().padStart(2, "0")}:${minutes}`;
  }

  useEffect(() => {
    console.log(startTime);
    if (startTime && startTime.length !== 0) {
      const [hours, minutes] = startTime.split(":");
      const start = new Date().setHours(hours, minutes, 0, 0);
      if (classes && classes.ageGroup == "Child") {
        const end = new Date(start + 45 * 60000);

        const formattedEndTime = end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const endTime = convertTo24Hour(formattedEndTime);
        setEndTime(endTime);
      } else {
        const end = new Date(start + 60 * 60000);

        const formattedEndTime = end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const endTime = convertTo24Hour(formattedEndTime);
        setEndTime(endTime);
      }
    }
  }, [startTime]);

  function sortUsers(users) {
    if (!users) {
      return [];
    }

    return users.sort((a, b) => {
      if (
        a.username &&
        a.username.toLowerCase().startsWith("a") &&
        b.username &&
        !b.username.toLowerCase().startsWith("a")
      ) {
        return -1;
      } else if (
        a.username &&
        !a.username.toLowerCase().startsWith("a") &&
        b.username &&
        b.username.toLowerCase().startsWith("a")
      ) {
        return 1;
      } else if (a.username && b.username) {
        return a.username.localeCompare(b.username);
      } else {
        return 0;
      }
    });
  }

  sortUsers(users);
  sortUsers(trainers);

  return (
    <div className="card p-3">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit {classes && classes.ageGroup} Class ID:{" "}
              {classes && classes.id}
            </h5>
            <button
              type="button"
              className="btn-close text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <div className="row">
                <div className="col-sm-6">
                  <label>
                    ID:
                    <input
                      type="text"
                      className="form-control"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      readOnly
                    />
                  </label>
                </div>
                <div className="col-sm-6">
                  {" "}
                  <label>
                    Title:
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-sm-6">
                  {" "}
                  <label>
                    Date:
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-sm-6">
                  {" "}
                  <label>
                    Class Number:
                    <input
                      type="number"
                      className="form-control"
                      value={noStudents}
                      onChange={(e) => setNoStudents(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-sm-6">
                  {" "}
                  <label>Start Time:</label>
                  {classes && classes.ageGroup == "Child" ? (
                    <select
                      className="form-control"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      <option value={startTime}>{startTime}</option>
                      <option value="07:00">07:00 - 07:45 AM</option>
                      <option value="07:45">07:45 - 08:30 AM</option>
                      <option value="08:30">08:30 - 09:15 AM</option>
                      <option value="09:15">09:15 - 10:00 AM</option>
                      <option value="10:00">10:00 - 10:45 AM</option>
                      <option value="10:45">10:45 - 11:30 AM</option>
                      <option value="11:30">11:30 - 12:15 PM</option>
                      <option value="12:15">12:15 - 01:00 PM</option>
                      <option value="13:00">01:00 - 01:45 PM</option>
                      <option value="13:45">01:45 - 02:30 PM</option>
                      <option value="14:30">02:30 - 03:15 PM</option>
                      <option value="15:15">03:15 - 04:00 PM</option>
                      <option value="16:00">04:00 - 04:45 PM</option>
                      <option value="16:45">04:45 - 05:30 PM</option>
                      <option value="17:30">05:30 - 06:15 PM</option>
                      <option value="18:15">06:15 - 07:00 PM</option>
                    </select>
                  ) : (
                    <select
                      className="form-control"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      <option value={startTime}>{startTime}</option>
                      <option value="07:00">07:00 - 08:00 AM</option>
                      <option value="08:00">08:00 - 09:00 AM</option>
                      <option value="09:00">09:00 - 10:00 AM</option>
                      <option value="10:00">10:00 - 11:00 AM</option>
                      <option value="11:00">11:00 - 12:00 NOON</option>
                      <option value="12:00">12:00 - 01:00 PM</option>
                      <option value="13:00">01:00 - 02:00 PM</option>
                      <option value="14:00">02:00 - 03:00 PM</option>
                      <option value="15:00">03:00 - 04:00 PM</option>
                      <option value="16:00">04:00 - 05:00 PM</option>
                      <option value="17:00">05:00 - 06:00 PM</option>
                      <option value="18:00">06:00 - 07:00 PM</option>
                    </select>
                  )}
                </div>
                <div className="col-sm-6">
                  <label className="mt-4">End Time: {endTime}</label>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Coach</label>
                    {trainers && (
                      <select
                        className="form-control"
                        type="text"
                        value={trainer}
                        onChange={(e) => setTrainer(e.target.value)}
                      >
                        <option value={trainer}>{trainer}</option>
                        {acisLoading ? (
                          <ClipLoader />
                        ) : (
                          trainers.map((user) => (
                            <option key={user.id} value={user.username}>
                              {user.username}
                            </option>
                          ))
                        )}
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Swimmer</label>
                    {users && (
                      <select
                        className="form-control"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                      >
                        <option value={studentName}>{studentName}</option>
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
                    )}
                  </div>
                </div>
                <div className="col-sm-12 d-flex justify-content-center">
                  {loading ? (
                    <>
                      <ClipLoader />
                    </>
                  ) : (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EditClass;
