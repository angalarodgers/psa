import React, { useState } from "react";
import { Calendar, Modal, Form, Input, Button, Select } from "antd";

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
  };

  const handleFormSubmit = async (values) => {
    const { title, description, timeFrame } = values;
    const dateKey = selectedDate.format("YYYY-MM-DD");
    const eventData = { title, description, date: dateKey, timeFrame };
    console.log(eventData);

    const res = await makeRequest
      .post("/events/addEvent", eventData)
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
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Select time frame"
            name="timeFrame"
            rules={[{ required: true, message: "Please select a time frame" }]}
          >
            <Select>
              {serror
                ? "Something Went Wring"
                : sisLoading
                ? "Loading"
                : sessions.map((dt) => (
                    <Select.Option value={dt.s} key={dt.id}>
                      {dt.session}, Start: {dt.startsAt}, End: {dt.endsAt}
                    </Select.Option>
                  ))}

              <Select.Option value="13">Day</Select.Option>
              <Select.Option value="14">Week</Select.Option>
              <Select.Option value="15">Month</Select.Option>
            </Select>
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
