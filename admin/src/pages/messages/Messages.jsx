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
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const containerRef = useRef(null);

  const viewMessages = async (e, userId) => {
    setCurrentUser(userId);

    const res = await makeRequest.post("/messages/markAsRead", {
      user: userId,
    });
    console.log(res);
    if (res.status === 200) {
    }
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
    console.log("message" + response.data.length);
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

  const combinedArray = newUsers.map((user) => {
    const messages = userMessages.filter(
      (msg) => msg.user_id === user.id || msg.receiver_id === user.id
    );
    const sortedMessages = messages.sort((a, b) => b.isread - a.isread);
    return { ...user, messages: sortedMessages };
  });

  combinedArray.forEach(function (user) {
    let count = 0;
    user.messages.forEach(function (message) {
      if (message.isread === 0) {
        count++;
      }
    });
    user.countIsread = count;
    if (count === 0) {
      user.countIsread = 0;
    }
  });

  combinedArray.sort(function (a, b) {
    return b.countIsread - a.countIsread;
  });

  function handleClick() {
    setCount(count + 1);
    window.location.reload();
  }

  return (
    <div className="row">
      <div className="col-sm-3">
        <div className="card p-1 ">
          <p style={{ height: "80vh", overflow: "scroll" }} className="mt-2">
            {" "}
            {acerror
              ? "Something Went Wring"
              : acisLoading
              ? "Loading"
              : combinedArray.map((swimmer) =>
                  swimmer.countIsread > 0 ? (
                    <p
                      className="px-3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        swimmer={swimmer}
                        key={swimmer.id}
                        className="bg-default"
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          border: "1px dotted gray",
                        }}
                      >
                        <div
                          className="d-flex px-2 py-1 "
                          onClick={(e) => viewMessages(e, swimmer.id)}
                        >
                          <div>
                            <img
                              src={`../assets/img/${swimmer.img}`}
                              className="avatar avatar-sm me-3"
                              alt="user1"
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <p className="mb-0 text-sm">
                              <small>
                                {swimmer.username}
                                <i className="fa fa-envelope"></i>
                              </small>
                            </p>
                            <p className="text-xs text-secondary mb-0">
                              <small>{swimmer.email}</small>
                            </p>
                          </div>
                        </div>
                      </span>
                    </p>
                  ) : (
                    <p
                      className="px-3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <span swimmer={swimmer} key={swimmer.id}>
                        <div
                          className="d-flex px-2 py-1"
                          onClick={(e) => viewMessages(e, swimmer.id)}
                        >
                          <div>
                            <img
                              src={`../assets/img/${swimmer.img}`}
                              className="avatar avatar-sm me-3"
                              alt="user1"
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <p className="mb-0 text-sm">
                              <small>{swimmer.username}</small>
                            </p>
                            <p className="text-xs text-secondary mb-0">
                              <small>{swimmer.email}</small>
                            </p>
                          </div>
                        </div>
                      </span>
                    </p>
                  )
                )}
          </p>
        </div>
      </div>
      <div className="col-sm-9">
        <div className="message-container">
          <div className="row">
            <div className="col-sm-3">
              <span>
                {filteredUsers.length === 0 ? (
                  <span>No User</span>
                ) : (
                  <h6 style={{ color: "darkGreen" }}>
                    {filteredUsers[0].username}
                  </h6>
                )}
              </span>
            </div>
            <div className="col-sm-6"></div>
            <div className="col-sm-3">
              <button onClick={handleClick} className="btn btn-default btn-xs">
                Refresh
              </button>
            </div>
          </div>
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
                        width: "auto",
                      }}
                    >
                      <div
                        className="d-flex py-1"
                        style={{ marginLeft: "70%" }}
                      >
                        <div className="">
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
                      <div className="d-flex px-1 py-1">
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
      <Toaster />
    </div>
  );
};

export default Messages;
