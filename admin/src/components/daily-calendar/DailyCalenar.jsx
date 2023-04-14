import React, { useState } from "react";
import { Calendar, Modal, Form, Input, Button, Select, TimePicker } from "antd";

import moment from "moment";
import axios from "axios";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import toast, { Toaster } from "react-hot-toast";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DailyCalenar = () => {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [count_left, setCountLeft] = useState(null);
  const [countEvents, setCountEvents] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState("00:00:00");
  const [desc, setDesc] = useState("");
  const [newUsers, setNewUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [childrens, setChildren] = useState([]);
  const { acisLoading, acerror, acdata } = useQuery("GetAllClients", () =>
    makeRequest.get("/users/getTrainers").then((res) => {
      setTrainers(res.data);
      return res.data;
    })
  );

  const { userisLoading, usererror, userdata } = useQuery("GetAllUsers", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      setNewUsers(res.data);
      return res.data;
    })
  );

  const { cisLoading, error, data } = useQuery(`ordersAll`, () =>
    makeRequest.get("/events/getEvents").then((res) => {
      setCountEvents(res.data);
      console.log(res.data);
      return res.data;
    })
  );

  const { chcisLoading, cherror, chdata } = useQuery(`getChildren`, () =>
    makeRequest.get("/users/getChildren").then((res) => {
      setChildren(res.data);
      console.log(res.data);
      return res.data;
    })
  );

  const combinedArray = newUsers.map((user) => {
    const childrenOfUser = childrens.filter(
      (child) => child.user_id === user.id
    );
    const childrenWithInfo = childrenOfUser.map((child) => {
      const childInfo = newUsers.find((u) => u.id === child.child_id);
      return {
        ...child,
        ...childInfo,
      };
    });
    const count = childrenWithInfo.length;
    return {
      ...user,
      children: childrenWithInfo,
      count: count,
    };
  });

  const handleChange = (time, timeString) => {
    const start = time.format("HH:mm:ss");
    const dateKey = selectedDate.format("YYYY-MM-DD");
    setSelectedStartTime(start);
    const filteredEvents = countEvents.filter((event) => {
      return event.startTime === start && event.date === dateKey;
    });

    setCountLeft(filteredEvents.length);
  };

  const AddAgeGroup = (value) => {
    setDesc(value);
  };

  const { data: events = {}, isLoading } = useQuery("Myevents", async () => {
    const { data } = await makeRequest.get("/events/getEvents");

    return data.reduce((acc, event) => {
      const dateKey = moment(event.date).format("YYYY-MM-DD");
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(event);
      return acc;
    }, {});
  });

  const { sisLoading, serror, sdata } = useQuery("getTimeSessions", () =>
    makeRequest.get("/events/getSessions").then((res) => {
      setSessions(res.data);
      return res.data;
    })
  );

  const onDateSelect = (date) => {
    const defaultStartTime = moment("07:00:00", "HH:mm:ss");
    setCountLeft(0);
    setSelectedStartTime("00:00:00");
    setSelectedDate(date);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedDate(null);
    setStartTime("");
    setEndTime("");
    setAgeGroup("");
  };

  const handleFormSubmit = async (values) => {
    const {
      title,
      description,
      timeFrame,
      startTime,
      endTime,
      ageGroup,
      trainer,
    } = values;
    const dateKey = selectedDate.format("YYYY-MM-DD");
    const start = startTime.format("HH:mm:ss");
    const end = endTime.format("HH:mm:ss");
    const eventData = {
      title,
      description,
      date: dateKey,
      timeFrame: 1,
      start,
      end,
      ageGroup,
      trainer,
    };
    console.log(eventData);

    const res = await makeRequest
      .post("/events/saveCalendarEvent", eventData)
      .then(async () => {
        toast.success("Registered Successfully!");
        await sleep(2000);
        closeModal();
        window.location.reload(true);
      });
  };

  const renderEventList = (date) => {
    const dateKey = date.format("YYYY-MM-DD");
    const eventList = events[dateKey];

    if (!eventList) {
      return null;
    }

    return (
      <ul>
        {eventList.map((event, index) => (
          <li key={index}>
            {event.ageGroup} : <strong>{event.student_name}</strong> <br />
            <span>
              Trainer : <strong>{event.trainer}</strong> <br />
            </span>
            <span>Description: {event.description}</span>
            <p>
              Start Time:{" "}
              <small>
                <strong>{event.startTime}</strong>
              </small>
              , End Time:{" "}
              <small>
                <strong>{event.endTime}</strong>
              </small>
            </p>
          </li>
        ))}
        <div>
          <a href="/add-class">
            <button className="btn btn-outline-secondary">Add Class</button>
          </a>
        </div>
      </ul>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(combinedArray);

  return (
    <>
      <Calendar
        mode="month"
        onSelect={onDateSelect}
        dateCellRender={renderEventList}
      />
      <Modal
        title={selectedDate && selectedDate.format("dddd, MMMM Do YYYY")}
        visible={visible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedDate && renderEventList(selectedDate)}
        <Form onFinish={handleFormSubmit} style={{ display: "none" }}>
          <Form.Item
            label="Swimmer"
            name="title"
            rules={[
              {
                required: true,
                message: "Please Swimmer who will attend this class",
              },
            ]}
          >
            <Select>
              <Select.Option value="">--Select Swimmer --</Select.Option>
              {usererror
                ? "Something Went Wring"
                : userisLoading
                ? "Loading"
                : newUsers.map((dt) => (
                    <Select.Option value={dt.username} key={dt.id}>
                      {dt.id} / {dt.username}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Select Child"
            name="ageGroup"
            rules={[{ required: true, message: "Please select a child" }]}
          >
            <Select>
              <Select.Option value="">--Select Child --</Select.Option>
              {acerror
                ? "Something Went Wring"
                : acisLoading
                ? "Loading"
                : combinedArray.map((user) =>
                    user.children.map((child) => (
                      <Select.Option
                        value={child.child_id}
                        key={child.child_id}
                      >
                        {child.Child_id} / {user.username} / {child.username} /{" "}
                        {child.userAge}
                      </Select.Option>
                    ))
                  )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Age Group"
            name="ageGroup"
            rules={[{ required: true, message: "Please select an age group" }]}
          >
            <Select onChange={(value) => AddAgeGroup(value)}>
              <Select.Option value="">-- Select Age Group --</Select.Option>
              <Select.Option value="adult">Adult</Select.Option>
              <Select.Option value="child">Child</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select time frame"
            name="timeFrame"
            style={{ display: "none" }}
            rules={[{ required: false, message: "Please select a Session" }]}
          >
            <Select defaultValue="2">
              <Select.Option value="2">Day Session</Select.Option>
              {serror
                ? "Something Went Wring"
                : sisLoading
                ? "Loading"
                : sessions.map((dt) => (
                    <Select.Option value={dt.s} key={dt.id}>
                      {dt.t} {dt.session}
                    </Select.Option>
                  ))}

              <Select.Option value="13">Day</Select.Option>
              <Select.Option value="14">Week</Select.Option>
              <Select.Option value="15">Month</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "Please enter a start time" }]}
          >
            <TimePicker format="HH:mm:ss A" onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <span>
              Remaining slots at <strong>{selectedStartTime} is </strong>:{" "}
              <strong>{6 - count_left}</strong>
            </span>
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please enter an end time" }]}
          >
            <TimePicker format="HH:mm:ss A" />
          </Form.Item>
          <Form.Item
            label="Select Trainer"
            name="trainer"
            rules={[
              {
                required: true,
                message: "Please select a Trainer for this class",
              },
            ]}
          >
            <Select>
              <Select.Option value="">--Select Trainer --</Select.Option>
              {acerror
                ? "Something Went Wring"
                : acisLoading
                ? "Loading"
                : trainers.map((dt) => (
                    <Select.Option value={dt.username} key={dt.id}>
                      {dt.id} / {dt.username}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={`Description->${desc}`}
            name="description"
            rules={[{ required: false, message: "Please enter a description" }]}
          >
            <Input.TextArea value={desc} defaultValue={desc}>
              {desc}
            </Input.TextArea>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Event
          </Button>
        </Form>
      </Modal>
      <Toaster />
    </>
  );
};

export default DailyCalenar;
