import React, { useState, useContext, useEffect, useRef } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";

import "./Message.css";
import FormattedDate from "./FormatDate";

const Messages = () => {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const containerRef = useRef(null);

  const sendMessageMutation = useMutation((newMessage) =>
    makeRequest.post("/messages/sendMessage", { message: newMessage })
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
      message.user_id === currentUser.id ||
      message.receiver_id === currentUser.id
  );

  userMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className="message-container">
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
                  message.user_id === currentUser.id ? "right" : "left",
              }}
            >
              {message.user_id === currentUser.id ? (
                <div
                  className="message-contentme"
                  style={{ textAlign: "right", borderTopRightRadius: "1px" }}
                >
                  <div
                    className="d-flex px-2 py-1"
                    style={{ textAlign: "right" }}
                  >
                    <div>
                      <img
                        src={`assets/images/${currentUser.img}`}
                        className="avatar avatar-sm me-3 mx-3"
                        alt={currentUser.username}
                      />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">{currentUser.username}</h6>
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
                      <h6 className="mb-0 text-sm">Admin</h6>
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
  );
};

export default Messages;
