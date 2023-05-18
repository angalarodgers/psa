import { SpaceContext } from "antd/es/space";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { makeRequest } from "../../axios";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

const saveSwimmer = async (inputs) => {
  const response = await makeRequest.post("/users/updateSwimmer", inputs);
  return response.data;
};

const saveTrainer = async (inputs) => {
  const response = await makeRequest.post("/users/updateTrainer", inputs);
  console.log(response.data);
  return response.data;
};

const deleteClass = async (inputs) => {
  const response = await makeRequest.post("/users/deleteClass", inputs);
  return response.data;
};

const AddedTime = ({ messages, todayEvents, todayEventLoading }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [inputs, setInputs] = useState({
    class_id: "",
    student_name: "",
    trainer_name: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const { acisLoading, acerror, acdata } = useQuery("GetMyAllClients", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      setUsers(res.data);
    })
  );

  const { trainerLoading, trainererror, trainerdata } = useQuery(
    "GetMyAllTrainers",
    () =>
      makeRequest.get("/users/getTrainers").then((res) => {
        setTrainers(res.data);
      })
  );

  const { mutateAsync, isLoading } = useMutation(saveSwimmer, {
    onSuccess: () => {
      toast.success("Message sent!");
      setSelectedUser("");
    },
    onError: () => {
      toast.error("Error Assigning student! Select another student");
    },
  });

  const { mutateAsync: saveTrainerAsync, isLoading: isTrainerLoading } =
    useMutation(saveTrainer, {
      onSuccess: () => {
        toast.success("Trainer saved successfully!");
        setSelectedTrainer("");
      },
      onError: () => {
        toast.error(
          "Trainer has been assigned another class at or within the provided time"
        );
      },
    });

  const { mutateAsync: deleteClassAsync, isLoading: isDeletingClass } =
    useMutation(deleteClass, {
      onSuccess: () => {
        toast.success("Class deleted successfully!");
      },
      onError: () => {
        toast.error("Error deleting class");
      },
    });

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedUserId = parseInt(event.target.value);
    const user = users.find((user) => user.id === selectedUserId);

    const count = messages.filter(
      (event) => event.student_name === user.username
    ).length;
    user.count = count;

    setSelectedUser(user);
  };

  const handleSelectChangeTrainer = (event) => {
    const selectedUserId = parseInt(event.target.value);
    const user = trainers.find((user) => user.id === selectedUserId);

    const count = messages.filter(
      (event) => event.trainer === user.username
    ).length;

    user.count = count;
    setSelectedTrainer(user);
  };

  const filteredUsers = users
    ? users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredTrainers = trainers
    ? trainers.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSave = async (e, class_id, date, startTime, endTime) => {
    inputs.class_id = class_id;
    inputs.student_name = selectedUser.username;
    inputs.date = date;
    inputs.startTime = startTime;
    inputs.endTime = endTime;
    setInputs(inputs);
    console.log(inputs);
    if (inputs.length !== 0) {
      if (inputs.student_name.length === 0) {
        toast.error("Error adding swimmer");
      } else {
        await mutateAsync(inputs);
      }
    }
  };

  const handleSaveTrainer = async (e, class_id, date, startTime, endTime) => {
    inputs.class_id = class_id;
    inputs.trainer_name = selectedTrainer.username;
    inputs.date = date;
    inputs.startTime = startTime;
    inputs.endTime = endTime;
    setInputs(inputs);
    console.log(inputs);
    if (inputs.length !== 0) {
      if (inputs.trainer_name.length === 0) {
        toast.error("Error adding trainer");
      } else {
        await saveTrainerAsync(inputs);
      }
    }
  };

  const handleDelete = async (e, class_id) => {
    if (class_id.length !== 0) {
      await deleteClassAsync({ class_id: class_id });
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        {todayEventLoading ? (
          <ClipLoader />
        ) : (
          <ol>
            {todayEvents.map((message) => (
              <li
                key={message.id}
                className={`mb-1 p-1 shadow-lg p-3 mb-5 bg-white rounded`}
                style={{
                  fontSize: "12px",
                  border: "1px dotted gray",
                  backgroundColor: "lightcyan",
                }}
              >
                <p>
                  <small>
                    {" "}
                    {message.ageGroup} / {message.title} - {message.startTime} /
                    ends: {message.endTime} / Trainer :{" "}
                    <strong>{message.trainer}</strong> / Student :{" "}
                    <strong>{message.student_name}</strong>
                  </small>
                </p>
                <p className="d-flex justify-content-center">
                  <a
                    className="badge bg-gradient-primary mx-1"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="collapse"
                    data-bs-target={`#trainer${message.id}`}
                    role="button"
                    aria-expanded="false"
                    aria-controls={`trainer${message.id}`}
                    onClick={() => {
                      const swimmer = document.querySelector(
                        `#swimmer${message.id}`
                      );
                      if (swimmer.classList.contains("show")) {
                        swimmer.classList.remove("show");
                      }
                    }}
                  >
                    Add Trainer
                  </a>
                  <a
                    className="badge bg-gradient-info mx-1"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="collapse"
                    data-bs-target={`#swimmer${message.id}`}
                    role="button"
                    aria-expanded="false"
                    aria-controls={`swimmer${message.id}`}
                    onClick={() => {
                      const swimmer = document.querySelector(
                        `#trainer${message.id}`
                      );
                      if (swimmer.classList.contains("show")) {
                        swimmer.classList.remove("show");
                      }
                    }}
                  >
                    Add Swimmer
                  </a>

                  <a
                    className="badge bg-gradient-danger"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(e, message.id);
                    }}
                  >
                    Delete
                  </a>
                </p>
                <p>
                  <div
                    className="collapse mt-1"
                    id={`trainer${message.id}`}
                    style={{ border: "1px solid cyan" }}
                  >
                    {message.trainer !== "None" ? (
                      <div className="card card-header p-2 d-flex justify-content-center">
                        {" "}
                        Replace Trainer <strong>{message.trainer}</strong>
                      </div>
                    ) : (
                      <div className="card card-header p-2 d-flex justify-content-center">
                        Add Trainer To This Class
                      </div>
                    )}
                    <div className="card card-body">
                      <div className="container">
                        <div className="form-group">
                          <label htmlFor="user-input">Select a Trainer:</label>
                          <input
                            id="user-input"
                            type="text"
                            className="form-control"
                            placeholder="Type to search"
                            value={searchTerm}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <select
                            onChange={handleSelectChangeTrainer}
                            className="form-control"
                          >
                            <option value="">--Select a Trainer--</option>
                            {trainerLoading ? (
                              <ClipLoader />
                            ) : (
                              filteredTrainers &&
                              filteredTrainers.map((user) => {
                                const checkMatchingClasses = (
                                  start,
                                  end,
                                  tdate,
                                  trainer,
                                  classes
                                ) => {
                                  // Loop through the array of classes
                                  for (let i = 0; i < classes.length; i++) {
                                    const classObj = classes[i];

                                    // Check if the start time, end time, date, and trainer match the provided values
                                    if (
                                      classObj.startTime == start &&
                                      classObj.endTime == end &&
                                      classObj.date == tdate &&
                                      classObj.trainer == trainer
                                    ) {
                                      // Return true if a match is found
                                      return true;
                                    }
                                  }
                                  // Return false if no match is found
                                  return false;
                                };
                                const isMatch = checkMatchingClasses(
                                  message.startTime,
                                  message.endTime,
                                  message.date,
                                  user.username,
                                  messages
                                );
                                // Render the Trainers component only if there's a match
                                if (!isMatch) {
                                  return (
                                    <option key={user.id} value={user.id}>
                                      {user.username}
                                    </option>
                                  );
                                }

                                // Return null if there's no match, so that no option is rendered
                                return null;
                              })
                            )}
                          </select>
                        </div>
                        <div className="form-group d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-outline-secondary"
                            onClick={(e) => {
                              e.preventDefault(); // prevent page from scrolling up
                              handleSaveTrainer(
                                e,
                                message.id,
                                message.date,
                                message.startTime,
                                message.endTime
                              );
                            }}
                          >
                            Add
                          </button>
                        </div>
                        {selectedTrainer && (
                          <div className="user-info">
                            <span>
                              <strong>Trainer Info</strong>
                            </span>{" "}
                            <br />
                            <small>
                              <small>
                                Number of Classes:{" "}
                                <strong>{selectedTrainer.count}</strong>
                              </small>{" "}
                              <br />
                              <small>
                                Username: {selectedTrainer.username}
                              </small>{" "}
                              <br />
                              <small>ID: {selectedTrainer.id}</small>
                              <br />
                              <small>Email: {selectedTrainer.email}</small>
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </p>
                <p>
                  <div
                    className="collapse"
                    id={`swimmer${message.id}`}
                    style={{ border: "1px solid cyan" }}
                  >
                    {message.student_name !== "None" ? (
                      <div className="card card-header p-2">
                        {" "}
                        Replace Swimmer{" "}
                        <span>
                          <strong>{message.student_name}</strong>
                        </span>
                      </div>
                    ) : (
                      <div className="card card-header p-2">
                        Add Swimmer To This Class
                      </div>
                    )}
                    <div className="card card-body">
                      <div className="container">
                        <div className="form-group">
                          <label htmlFor="user-input">Select a swimmer:</label>
                          <input
                            id="user-input"
                            type="text"
                            className="form-control"
                            placeholder="Type to search"
                            value={searchTerm}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <select
                            onChange={handleSelectChange}
                            className="form-control"
                          >
                            <option value="">--Select a Swimmer--</option>
                            {acisLoading ? (
                              <ClipLoader />
                            ) : (
                              filteredUsers &&
                              filteredUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.username}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                        <div className="form-group d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-outline-secondary"
                            onClick={(e) => {
                              e.preventDefault(); // prevent page from scrolling up
                              handleSave(
                                e,
                                message.id,
                                message.date,
                                message.startTime,
                                message.endTime
                              );
                            }}
                          >
                            Add
                          </button>
                        </div>
                        {selectedUser && (
                          <div className="user-info">
                            <span>
                              <strong>Swimmer Info</strong>
                            </span>{" "}
                            <br />
                            <small>
                              <small>
                                Number of Classes:{" "}
                                <strong>{selectedUser.count}</strong>
                              </small>{" "}
                              <br />
                              <small>
                                Username: {selectedUser.username}
                              </small>{" "}
                              <br />
                              <small>ID: {selectedUser.id}</small>
                              <br />
                              <small>
                                Age Group: {selectedUser.ageGroup}
                              </small>{" "}
                              <br />
                              <small>Email: {selectedUser.email}</small>
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </p>
                <hr />
              </li>
            ))}
          </ol>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default AddedTime;
