import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";
import { TimePicker } from "antd";
import moment from "moment";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Schedules.scss";
import AddedTime from "./AddedTime";
import ChildDiary from "./ChildDiary";
import AdultDiary from "./AdultDiary";

const sendMessage = async (inputs) => {
  const response = await makeRequest.post("/events/addEvent", inputs);

  return response.data;
};

const getMessages = async () => {
  const response = await makeRequest.get("/events/getEvents");
  return response.data;
};

const getTodayEvents = async (selectedDate, ageGroup) => {
  if (selectedDate) {
    const dateString = selectedDate;
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const response = await makeRequest.get("/events/getEvents");
    if (ageGroup) {
      const infilteredData = response.data.filter((obj) => {
        const indate = new Date(obj.date);
        const inyear = indate.getFullYear();
        const inmonth = String(indate.getMonth() + 1).padStart(2, "0");
        const inday = String(indate.getDate()).padStart(2, "0");
        const informattedDate = `${inyear}-${inmonth}-${inday}`;
        return informattedDate === formattedDate && obj.ageGroup === ageGroup;
      });

      return infilteredData;
    } else {
      const infilteredData = response.data.filter((obj) => {
        const indate = new Date(obj.date);
        const inyear = indate.getFullYear();
        const inmonth = String(indate.getMonth() + 1).padStart(2, "0");
        const inday = String(indate.getDate()).padStart(2, "0");
        const informattedDate = `${inyear}-${inmonth}-${inday}`;
        return informattedDate === formattedDate;
      });

      return infilteredData;
    }
  } else {
    console.log("No date selected");
  }
};

const countByTime = (todayEvents, startTime) => {
  const filteredArray =
    todayEvents !== undefined && startTime !== undefined
      ? todayEvents.filter(
          (obj) => obj.startTime.startsWith(startTime) && startTime !== ""
        )
      : [];

  return filteredArray;
};

const AddClass = () => {
  const [ageGroup, setAgeGroup] = useState("");
  const [inputs, setInputs] = useState({
    title: "Swimming Class",
    date: "",
    ageGroup: "",
    startTime: "",
    endTime: "",
    timeFrame: 7,
  });
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { mutateAsync, isLoading } = useMutation(sendMessage, {
    onSuccess: () => {
      toast.success("Message sent!");
      setMessage("");
    },
    onError: () => {
      toast.error("Error sending message");
    },
  });

  const { data: messages, isLoading: messagesLoading } = useQuery(
    "messages",
    getMessages,
    {
      refetchInterval: 1000,
    }
  );

  const { data: todayEvents, isLoading: todayEventLoading } = useQuery(
    ["Events", selectedDate, ageGroup],
    () => getTodayEvents(selectedDate, ageGroup),
    {
      refetchInterval: 1000,
    }
  );

  const { data: todayEventsByTime, isLoading: todayEventLoadingByTime } =
    useQuery(
      ["EventsByTime", todayEvents, inputs.startTime],
      () => countByTime(todayEvents, inputs.startTime),
      {
        refetchInterval: 1000,
      }
    );

  function handleDateChange(date) {
    const currentDate = new Date();
    if (date < currentDate) {
      const errorMessage = `Sorry, ${date.toDateString()} has passed. You can only view classes scheduled on this date.`;
      toast.success(errorMessage);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
    }
  }

  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    if (inputs.length !== 0) {
      inputs.date = selectedDate;
      setInputs(inputs);
      await mutateAsync(inputs);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  function handleSelectChange(event) {
    inputs.ageGroup = event.target.value;
    setInputs(inputs);
    setAgeGroup(event.target.value);
    console.log(inputs);
  }

  function handleTimeChange(time) {
    console.log(time);
    try {
      if (time) {
        if (inputs.ageGroup) {
          const age = inputs.ageGroup;
          var duration = 45;
          if (age === "Adult") {
            duration = 60;
          }

          const start = time.format("HH:mm");

          inputs.startTime = start;

          const newTime = moment(start, "HH:mm")
            .add(duration, "minutes")
            .format("HH:mm");
          inputs.endTime = newTime;
          setInputs(inputs);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  function handleSelectTimeChange(time) {
    console.log(time);
    try {
      if (time) {
        if (inputs.ageGroup) {
          const [hours, minutes] = time.split(":");
          const start = new Date().setHours(hours, minutes, 0, 0);
          if (inputs.ageGroup == "Child") {
            const end = new Date(start + 45 * 60000);

            const formattedEndTime = end.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const endTime = convertTo24Hour(formattedEndTime);
            inputs.endTime = endTime;
            inputs.startTime = time;
            setInputs(inputs);
          } else {
            const end = new Date(start + 60 * 60000);

            const formattedEndTime = end.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const endTime = convertTo24Hour(formattedEndTime);
            inputs.endTime = endTime;
            inputs.startTime = time;
            setInputs(inputs);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h6>Add Class {ageGroup}</h6>
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            <div className="card-header">
              {todayEvents && (
                <>
                  Number of <strong>{ageGroup && ageGroup}</strong> Events on{" "}
                  {selectedDate && selectedDate}
                  {todayEventsByTime && (
                    <>
                      {inputs.startTime ? (
                        <>
                          {" "}
                          At {inputs.startTime}{" "}
                          <strong>
                            {" "}
                            = {parseInt(todayEventsByTime.length)}
                          </strong>
                          <br />
                          Available Slots ={" "}
                          {6 - parseInt(todayEventsByTime.length)}
                        </>
                      ) : (
                        <>
                          <strong> = {parseInt(todayEvents.length)}</strong>
                        </>
                      )}
                    </>
                  )}{" "}
                </>
              )}
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Selected Date
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="date"
                    value={selectedDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Title</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">
                    Select Age Group
                  </label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={handleSelectChange}
                  >
                    <option value="">--Select Anothe Option--</option>
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                  </select>
                </div>
                {inputs.ageGroup && (
                  <>
                    <div className="form-control">
                      <div className="row">
                        {ageGroup == "Child" ? (
                          <div className="col-sm-12">
                            <ChildDiary todayEvents={todayEvents} />
                          </div>
                        ) : (
                          <div className="col-sm-12">
                            <AdultDiary todayEvents={todayEvents} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="form-group p-1"
                      style={{ border: "1px dotted gray" }}
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <label htmlFor="exampleFormControlSelect2">
                            Select Start Time
                          </label>{" "}
                          <br />
                          <TimePicker
                            className="mx-1"
                            id="start-time"
                            defaultValue={moment(inputs.startTime, "hh:mm A")}
                            format="h:mm A"
                            onChange={handleTimeChange}
                          />
                          <span style={{ display: "none" }}>
                            {inputs.ageGroup == "Child" ? (
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  handleSelectTimeChange(e.target.value)
                                }
                              >
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
                                onChange={(e) =>
                                  handleSelectTimeChange(e.target.value)
                                }
                              >
                                <option value="07:00">07:00 - 08:00 AM</option>
                                <option value="08:00">08:00 - 09:00 AM</option>
                                <option value="09:00">09:00 - 10:00 AM</option>
                                <option value="10:00">10:00 - 11:00 AM</option>
                                <option value="11:00">
                                  11:00 - 12:00 NOON
                                </option>
                                <option value="12:00">12:00 - 01:00 PM</option>
                                <option value="13:00">01:00 - 02:00 PM</option>
                                <option value="14:00">02:00 - 03:00 PM</option>
                                <option value="15:00">03:00 - 04:00 PM</option>
                                <option value="16:00">04:00 - 05:00 PM</option>
                                <option value="17:00">05:00 - 06:00 PM</option>
                                <option value="18:00">06:00 - 07:00 PM</option>
                              </select>
                            )}
                          </span>
                          <a
                            className="badge bg-gradient-primary mt-4"
                            style={{ cursor: "pointer" }}
                            onClick={handleSubmit}
                          >
                            Add Time
                          </a>
                        </div>
                        <div className="col-sm-3">
                          {inputs.ageGroup && (
                            <>
                              <label htmlFor="exampleFormControlSelect2">
                                {inputs.ageGroup}
                              </label>
                              <p className="mt-4">
                                <span>
                                  <small>
                                    {" "}
                                    Ends At: <strong>{inputs.endTime} </strong>
                                  </small>
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                        <div className="col-sm-3">
                          {todayEvents && (
                            <>
                              <small style={{ fontSize: "10px" }}>
                                Date{" "}
                                <strong>{selectedDate && selectedDate}</strong>
                              </small>{" "}
                              <br />
                              {todayEventsByTime && (
                                <>
                                  {inputs.startTime ? (
                                    <>
                                      {" "}
                                      <small style={{ fontSize: "12px" }}>
                                        At: {inputs.startTime}{" "}
                                      </small>
                                      <br />
                                      <strong>
                                        <small style={{ fontSize: "12px" }}>
                                          {" "}
                                          Classes :{" "}
                                          {parseInt(todayEventsByTime.length)}
                                        </small>
                                      </strong>
                                      <br />
                                      <small style={{ fontSize: "12px" }}>
                                        <strong>
                                          {" "}
                                          Slots ={" "}
                                          {6 -
                                            parseInt(todayEventsByTime.length)}
                                        </strong>
                                      </small>
                                    </>
                                  ) : (
                                    <>
                                      <strong>
                                        <small style={{ fontSize: "12px" }}>
                                          {" "}
                                          Classes:{" "}
                                          {parseInt(todayEvents.length)}
                                        </small>
                                      </strong>
                                    </>
                                  )}
                                </>
                              )}{" "}
                            </>
                          )}
                        </div>
                        <div className="col-sm-12">
                          <p>
                            <AddedTime
                              messages={messages}
                              todayEvents={todayEvents}
                              todayEventLoading={todayEventLoading}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="calendar-container mb-2">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
          <div className="card">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h6>Events Scheduled on Selected Date </h6>
                </div>
                <div className="card-body">
                  {todayEventLoading ? (
                    <ClipLoader />
                  ) : (
                    <ol>
                      {todayEvents.map((message) => (
                        <li
                          key={message.id}
                          className="shadow-lg p-3 mb-5 bg-white rounded"
                        >
                          <p className="shadow-inner">
                            <strong>{message.ageGroup}</strong> {message.title}{" "}
                            / Date: <strong>{message.date}</strong> / From :{" "}
                            <strong>{message.startTime}</strong> / To :{" "}
                            <strong>{message.endTime}</strong>
                          </p>
                          <p className="table-responsive p-0">
                            <table className="table align-items-center mb-0">
                              <thead>
                                <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Swimmers
                                </th>
                                <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Trainers
                                </th>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="align-middle text-center text-sm">
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">
                                        {message.student_name}
                                      </h6>
                                    </div>
                                  </td>
                                  <td className="align-middle text-center text-sm">
                                    <div className="d-flex flex-column justify-content-center">
                                      <h6 className="mb-0 text-sm">
                                        {message.trainer}
                                      </h6>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </p>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-2 ">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              <table>
                <thead>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Class ID
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Class Name
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Class Date
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Start Time
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    End Time
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Trainer
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Student
                  </th>
                </thead>
                <tbody>
                  {messagesLoading ? (
                    <ClipLoader />
                  ) : (
                    <>
                      {messages.map((message) => (
                        <tr key={message.id} className="hover-effect" id="">
                          <td className="align-middle text-center">
                            {message.id}
                          </td>
                          <td className="align-middle text-center">
                            {message.title}
                          </td>
                          <td className="align-middle text-center">
                            {message.date}
                          </td>
                          <td className="align-middle text-center">
                            {message.startTime}
                          </td>
                          <td className="align-middle text-center">
                            {message.endTime}
                          </td>
                          <td className="align-middle text-center">
                            {message.trainer}
                          </td>
                          <td className="align-middle text-center">
                            {message.student_name}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <form style={{ display: "none" }}>
        <input
          type="text"
          className="form-control"
          value={inputs.title}
          name="title"
          onChange={handleChange}
        />
      </form>

      <Toaster />
    </div>
  );
};

export default AddClass;
