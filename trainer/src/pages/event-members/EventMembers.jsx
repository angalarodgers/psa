import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import EventClients from "../assign-class/EventClients";

const EventMembers = () => {
  const [searchParam] = useSearchParams();
  const event_id = searchParam.get("event_id");
  console.log(event_id);
  return (
    <div className="card">
      <div className="card-body pt-3">
        <EventClients eventId={event_id} />
      </div>
    </div>
  );
};

export default EventMembers;
