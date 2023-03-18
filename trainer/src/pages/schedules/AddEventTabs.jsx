import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import toast, { Toaster } from "react-hot-toast";
import "./Schedules.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

const AddEventTabs = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    title: "class",
    description: "",
    date: null,
    timeFrame: "",
    startTime: "",
    endTime: "",
    ageGroup: "",
    trainer: "",
  });

  const [sessions, setSessions] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const { sisLoading, serror, sdata } = useQuery("getSessions", () =>
    makeRequest.get("/events/getSessions").then((res) => {
      setSessions(res.data);
      return res.data;
    })
  );

  const { tsisLoading, tserror, tsdata } = useQuery("getTrainers", () =>
    makeRequest.get("/users/getTrainers").then((res) => {
      setTrainers(res.data);
      return res.data;
    })
  );

  const disabledDates = { before: new Date() };

  const handleDateChange = (date) => {
    const currentDate = new Date();
    if (date < currentDate) {
      toast.error("You cannot select a date that has passed");
    } else {
      setSelectedDate(date);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handleFormSubmit = async (values) => {
    if (inputs.title.length === 0) {
      toast.error("Input Title is null!");
    } else if (inputs.description.length === 0) {
      toast.error("Input Description is null!");
    } else {
      const res = await makeRequest
        .post("/events/addEvent", inputs)
        .then(async () => {
          toast.success("Event Added Successfully!");
        });
    }
  };

  return (
    <>
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Select Event</label>
            <select
              className="form-control"
              id="exampleFormControlSelect2"
              onChange={handleChange}
              name="title"
            >
              <option value="class" selected>
                Swimming Class
              </option>
              <option value="practicles">Swimming Practicles</option>
              <option value="competition">Swimming Competition</option>
              <option value="trip">Swimming Trip</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="userAge">Age Group</label>
            <select
              className="form-control"
              id="ageGroup"
              name="ageGroup"
              value={inputs.ageGroup}
              onChange={handleChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="adults">Adults</option>
              <option value="children">Children</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Select Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Select Time</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={handleChange}
              name="timeFrame"
            >
              <option value="" selected disabled>
                Select Session
              </option>
              {serror
                ? "Something Went Wring"
                : sisLoading
                ? "Loading"
                : sessions.map((dt) => (
                    <option value={dt.s} key={dt.id}>
                      {dt.t} {dt.session}
                    </option>
                  ))}
            </select>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6">
                <label>
                  Start Time:
                  <input
                    className="form-control"
                    type="time"
                    value={inputs.startTime}
                    onChange={handleChange}
                    step={3600}
                    name="startTime"
                  />
                </label>
              </div>
              <div className="col-sm-6">
                <label>
                  End Time:
                  <input
                    className="form-control"
                    type="time"
                    value={inputs.endTime}
                    onChange={handleChange}
                    step={3600}
                    name="endTime"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Assign Trainer</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={handleChange}
              name="trainer"
            >
              <option value="" selected disabled>
                -- Select Trainer --
              </option>
              {tserror
                ? "Something Went Wring"
                : tsisLoading
                ? "Loading"
                : trainers.map((dt) => (
                    <option value={dt.username} key={dt.id}>
                      {dt.id} {dt.username}
                    </option>
                  ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Comments</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              defaultValue={""}
              onChange={handleChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn bg-gradient-primary"
              onClick={handleFormSubmit}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default AddEventTabs;
