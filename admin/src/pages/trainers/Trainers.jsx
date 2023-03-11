import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";

import { useQuery } from "react-query";
import Swimmer from "./Swimmer";
import AddUsers from "../../constants/AddUsers/AddUsers";

const Trainers = () => {
  const [newUsers, setNewUsers] = useState([]);
  const { acisLoading, acerror, acdata } = useQuery("GetAllClients", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
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
      <div className="col-md-4">
        <div className="card card-profile card-plain">
          <div className="card-body text-center bg-white shadow border-radius-lg p-3">
            <a href="javascript:;">
              <img
                className="w-100 border-radius-md"
                src="./assets/img/user.jpg"
              />
            </a>
            <small>Trainer</small>
            <h5 className="mt-3 mb-1 d-md-block d-none">Natalie Paisley</h5>
            <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
              Natalie Paisley
            </p>
            <p className="mb-0 text-xs font-weight-bolder text-warning text-gradient text-uppercase">
              Credit Analyst
            </p>
            <button
              className="btn btn-icon btn-3 btn-xs btn-outline-primary mt-1"
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-chat-round" />
              </span>
              <span className="btn-inner--text"> View</span>
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card card-profile card-plain">
          <div className="card-body text-center bg-white shadow border-radius-lg p-3">
            <a href="javascript:;">
              <img
                className="w-100 border-radius-md"
                src="./assets/img/user.jpg"
              />
            </a>
            <h5 className="mt-3 mb-1 d-md-block d-none">Natalie Paisley</h5>
            <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
              Natalie Paisley
            </p>
            <p className="mb-0 text-xs font-weight-bolder text-warning text-gradient text-uppercase">
              Credit Analyst
            </p>
            <button
              className="btn btn-icon btn-3 btn-xs btn-outline-primary mt-1"
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-chat-round" />
              </span>
              <span className="btn-inner--text"> View</span>
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card card-profile card-plain">
          <div className="card-body text-center bg-white shadow border-radius-lg p-3">
            <a href="javascript:;">
              <img
                className="w-100 border-radius-md"
                src="./assets/img/user.jpg"
              />
            </a>
            <h5 className="mt-3 mb-1 d-md-block d-none">Natalie Paisley</h5>
            <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
              Natalie Paisley
            </p>
            <p className="mb-0 text-xs font-weight-bolder text-warning text-gradient text-uppercase">
              Credit Analyst
            </p>
            <button
              className="btn btn-icon btn-3 btn-xs btn-outline-primary mt-1"
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-chat-round" />
              </span>
              <span className="btn-inner--text"> View</span>
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card card-profile card-plain">
          <div className="card-body text-center bg-white shadow border-radius-lg p-3">
            <a href="javascript:;">
              <img
                className="w-100 border-radius-md"
                src="./assets/img/user.jpg"
              />
            </a>
            <h5 className="mt-3 mb-1 d-md-block d-none">Natalie Paisley</h5>
            <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
              Natalie Paisley
            </p>
            <p className="mb-0 text-xs font-weight-bolder text-warning text-gradient text-uppercase">
              Credit Analyst
            </p>
            <button
              className="btn btn-icon btn-3 btn-xs btn-outline-primary mt-1"
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-chat-round" />
              </span>
              <span className="btn-inner--text"> View</span>
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card card-profile card-plain">
          <div className="card-body text-center bg-white shadow border-radius-lg p-3">
            <a href="javascript:;">
              <img
                className="w-100 border-radius-md"
                src="./assets/img/user.jpg"
              />
            </a>
            <h5 className="mt-3 mb-1 d-md-block d-none">Natalie Paisley</h5>
            <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
              Natalie Paisley
            </p>
            <p className="mb-0 text-xs font-weight-bolder text-warning text-gradient text-uppercase">
              Credit Analyst
            </p>
            <button
              className="btn btn-icon btn-3 btn-xs btn-outline-primary mt-1"
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-chat-round" />
              </span>
              <span className="btn-inner--text"> View</span>
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card card-profile card-plain">
          <div className="card-body text-center bg-white shadow border-radius-lg p-3">
            <a href="javascript:;">
              <img
                className="w-100 border-radius-md"
                src="./assets/img/user.jpg"
              />
            </a>
            <h5 className="mt-3 mb-1 d-md-block d-none">Natalie Paisley</h5>
            <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
              Natalie Paisley
            </p>
            <p className="mb-0 text-xs font-weight-bolder text-warning text-gradient text-uppercase">
              Credit Analyst
            </p>
            <button
              className="btn btn-icon btn-3 btn-xs btn-outline-primary mt-1"
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-chat-round" />
              </span>
              <span className="btn-inner--text"> View</span>
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 d-flex justify-content-center mt-4">
        <button type="button" class="btn btn-outline-default ">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Trainers;
