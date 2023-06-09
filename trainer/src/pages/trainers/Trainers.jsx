import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";

import { useQuery } from "react-query";
import Swimmer from "./Swimmer";
import AddUsers from "../../constants/AddUsers/AddUsers";

const Trainers = () => {
  const [newUsers, setNewUsers] = useState([]);
  const { acisLoading, acerror, acdata } = useQuery("GetAllClients", () =>
    makeRequest.get("/users/getTrainers").then((res) => {
      setNewUsers(res.data);
      return res.data;
    })
  );
  return (
    <div className="row">
      <div className="col-sm-12 text-left">
        <div className="row">
          <div className="col-sm-9">
            <h5>Trainers</h5>
          </div>
          <div className="col-sm-3 text-right">
            <button
              className="btn btn-icon btn-3 btn-primary text-right"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modal-form"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-button-plus" />
              </span>
              <span className="btn-inner--text">Add Trainer</span>
            </button>
            <AddUsers />
          </div>
        </div>
      </div>
      {acerror
        ? "Something Went Wring"
        : acisLoading
        ? "Loading"
        : newUsers.map((swimmer) => (
            <Swimmer swimmer={swimmer} key={swimmer.id} />
          ))}

      <div className="col-md-12 d-flex justify-content-center mt-4">
        <button type="button" class="btn btn-outline-default ">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Trainers;
