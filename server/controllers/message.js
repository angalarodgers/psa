import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getMessages = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM messages  ORDER BY msg_id ASC";
    // const q =
    // "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const sendMessage = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO messages (`user_id`,`msg`,`isread`,`receiver_id`) VALUES (?)";
    const values = [userInfo.id, req.body.message, 0, 0];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const sendAdminMessage = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO messages (`user_id`,`msg`,`isread`,`receiver_id`) VALUES (?)";
    const values = [userInfo.id, req.body.message, 0, req.body.userId];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};
