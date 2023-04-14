import React, { useState } from "react";
import { makeRequest } from "../../axios";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useQuery } from "react-query";

const EditClass = ({ event }) => {
  const [object, setObject] = useState(event);
  const [id, setId] = useState(object.id);
  const [title, setTitle] = useState(object.title);
  const [date, setDate] = useState(object.date);
  const [startTime, setStartTime] = useState(object.startTime);
  const [endTime, setEndTime] = useState(object.endTime);
  const [trainer, setTrainer] = useState(object.trainer);
  const [studentName, setStudentName] = useState(object.student_name);
  const [noStudents, setNoStudents] = useState(object.noStudents);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const { trainerLoading, trainererror, trainerdata } = useQuery(
    `GetMyAllTrainers${event.id}`,
    () =>
      makeRequest.get("/users/getTrainers").then((res) => {
        setTrainers(res.data);
      })
  );

  const { acisLoading, acerror, acdata } = useQuery(
    `GetMyAllClients${event.id}`,
    () =>
      makeRequest.get("/users/getCustomers").then((res) => {
        setUsers(res.data);
      })
  );

  const handleUpdate = () => {
    setLoading(true);
    const updatedObject = {
      id,
      title,
      date,
      startTime,
      endTime,
      trainer,
      student_name: studentName,
      noStudents,
    };
    makeRequest
      .put(`/events/updateClass/${object.id}`, updatedObject)
      .then((response) => {
        setLoading(false);
        setObject(response.data);
        toast.success("Object updated successfully!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error updating object.");
        console.error(error);
      });
  };
  return (
    <div
      className="modal fade"
      id={`exampleModal${event.id}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit {event.ageGroup} Class ID: {event.id}
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
                  <label>
                    Start Time:
                    <input
                      type="time"
                      className="form-control"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-sm-6">
                  <label>
                    End Time:
                    <input
                      type="time"
                      className="form-control"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </label>
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
    </div>
  );
};

export default EditClass;
