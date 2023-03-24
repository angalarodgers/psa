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

  const [trainers, setTrainers] = useState([]);
  const { acisLoading, acerror, acdata } = useQuery("GetAllClients", () =>
    makeRequest.get("/users/getTrainers").then((res) => {
      setTrainers(res.data);
      return res.data;
    })
  );

  const { data: events = {}, isLoading } = useQuery("Myevents", async () => {
    const { data } = await makeRequest.get("/events/getEvents");
    console.log(data);
    // Transform the array of events into an object that maps each event to its corresponding date key
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
            <strong>{event.title}</strong>: {event.description}
          </li>
        ))}
      </ul>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select Age Group"
            name="ageGroup"
            rules={[{ required: true, message: "Please select an age group" }]}
          >
            <Select>
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
            <TimePicker format="HH:mm:ss A" />
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
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea />
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
