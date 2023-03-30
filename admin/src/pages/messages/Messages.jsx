import React, { useState, useContext, useEffect, useRef } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";

import "./Message.css";
import FormattedDate from "./FormatDate";

const Messages = () => {
  const { thisUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(0);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const containerRef = useRef(null);

  const viewMessages = (e, userId) => {
    setCurrentUser(userId);
  };

  const sendMessageMutation = useMutation((newMessage) =>
    makeRequest.post("/messages/sendAdminMessage", {
      message: newMessage,
      userId: currentUser,
    })
  );

  const [newUsers, setNewUsers] = useState([]);
  const { acisLoading, acerror, acdata } = useQuery("GetAllClients", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      setNewUsers(res.data);
      return res.data;
    })
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessageMutation.mutate(message, {
      onSuccess: () => {
        setMessage("");
        queryClient.invalidateQueries("messages");
      },
    });
  };

  const { status, data } = useQuery("messages", async () => {
    const response = await makeRequest.get("/messages/getMessages");
    console.log(response.data);
    return response.data;
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching messages</div>;
  }

  // Filter messages where either user_id or receiver_id is 9
  const userMessages = data.filter(
    (message) =>
      message.user_id === currentUser || message.receiver_id === currentUser
  );

  userMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const filteredUsers = newUsers.filter((user) => user.id === currentUser);
  console.log(filteredUsers);

  return (
    <div className="row">
      <div className="col-sm-3">
        <div className="card p-1 ">
          <p style={{ height: "80vh", overflow: "scroll" }}>
            {" "}
            {acerror
              ? "Something Went Wring"
              : acisLoading
              ? "Loading"
              : newUsers.map((swimmer) => (
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <span swimmer={swimmer} key={swimmer.id}>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={(e) => viewMessages(e, swimmer.id)}
                      >
                        <span>{swimmer.username}</span>
                        <span className="badge badge-md badge-circle badge-floating badge-danger border-white text-dark">
                          <i className="fa fa-envelope bg-dark"></i> &nbsp;
                        </span>
                      </button>
                    </span>
                  </p>
                ))}
          </p>
        </div>
      </div>
      <div className="col-sm-9">
        <div className="message-container">
          {filteredUsers.length === 0 ? (
            <span>No User</span>
          ) : (
            <h6>{filteredUsers[0].username}</h6>
          )}
          <div
            className="message-history"
            style={{ height: "80vh", overflowY: "scroll" }}
          >
            <div>
              {userMessages.map((message) => (
                <div
                  key={message.msg_id}
                  className="message"
                  style={{
                    textAlign:
                      message.user_id !== currentUser ? "right" : "left",
                  }}
                >
                  {message.user_id !== currentUser ? (
                    <div
                      className="message-contentme"
                      style={{
                        borderTopRightRadius: "1px",
                      }}
                    >
                      <div className="d-flex px-2 py-1">
                        <div className="d-flex flex-column justify-content-center">
                          <div>
                            <img
                              src={`assets/img/200.png`}
                              className="avatar avatar-sm me-3 mx-3"
                              alt={currentUser.username}
                            />
                          </div>
                          <h6 className="mb-0 text-sm">
                            <i>Admin</i>
                          </h6>
                          <span>
                            <small style={{ fontSize: "12px" }}>
                              {message.msg}
                            </small>
                          </span>
                          <p className="text-xs text-dark mb-0">
                            <FormattedDate dateString={message.createdAt} />
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="message-content">
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src={`assets/img/200.png`}
                            className="avatar avatar-sm me-3"
                            alt={"admin"}
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">
                            {filteredUsers.length === 0 ? (
                              <>No User</>
                            ) : (
                              <i>{filteredUsers[0].username}</i>
                            )}
                          </h6>
                          <span>
                            <small style={{ fontSize: "12px" }}>
                              {message.msg}
                            </small>
                          </span>
                          <p className="text-xs text-dark mb-0">
                            <FormattedDate dateString={message.createdAt} />
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
