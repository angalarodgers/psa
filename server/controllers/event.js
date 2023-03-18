import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const saveEvent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const tm = req.body.timeFrame;
    var indx = 0;
    if (tm == 7) {
      indx = 1;
    } else if (tm == 8) {
      indx = 2;
    } else if (tm == 9) {
      indx = 3;
    } else if (tm == 10) {
      indx = 4;
    } else if (tm == 11) {
      indx = 5;
    } else if (tm == 12) {
      indx = 6;
    } else if (tm == 13) {
      indx = 7;
    } else if (tm == 14) {
      indx = 8;
    } else if (tm == 15) {
      indx = 9;
    } else if (tm == 16) {
      indx = 10;
    } else if (tm == 17) {
      indx = 11;
    } else if (tm === 18) {
      indx = 12;
    } else if (tm === 19) {
      indx = 13;
    } else if (tm === 20) {
      indx = 14;
    } else if (tm === 21) {
      indx = 15;
    } else if (tm === 22) {
      indx = 16;
    } else if (tm === 23) {
      indx = 17;
    } else if (tm === 24) {
      indx = 18;
    }
    console.log(tm, "-", indx);
    const q =
      "INSERT INTO events (`title`,`description`,`date`,`time`,`indx`, `startTime`,`endTime`,`ageGroup`,`trainer`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.description,
      req.body.date,
      req.body.timeFrame,
      indx,
      req.body.startTime,
      req.body.endTime,
      req.body.ageGroup,
      req.body.trainer,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getEvents = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM events ORDER BY id DESC";

    db.query(q, ["Customer"], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const getSessions = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM sessions ORDER BY id ASC";

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const getEventTime = (req, res) => {
  const token = req.cookies.accessToken;
  const event_time = parseInt(req.params.tm);
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM sessions WHERE `id` = ?";

    db.query(q, [event_time], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data[0]);
    });
  });
};

export const getEvent = (req, res) => {
  const token = req.cookies.accessToken;
  const eventId = parseInt(req.params.eventId);
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM events WHERE `id` = ?";

    db.query(q, [eventId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data[0]);
    });
  });
};

export const getEventCustomers = (req, res) => {
  const token = req.cookies.accessToken;
  const eventId = parseInt(req.params.eventId);
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM eventcustomers WHERE `eventId` = ?";

    db.query(q, [eventId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const saveCalendarEvent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const tm = req.body.timeFrame;
    var indx = 0;
    if (tm == 7) {
      indx = 1;
    } else if (tm == 8) {
      indx = 2;
    } else if (tm == 9) {
      indx = 3;
    } else if (tm == 10) {
      indx = 4;
    } else if (tm == 11) {
      indx = 5;
    } else if (tm == 12) {
      indx = 6;
    } else if (tm == 13) {
      indx = 7;
    } else if (tm == 14) {
      indx = 8;
    } else if (tm == 15) {
      indx = 9;
    } else if (tm == 16) {
      indx = 10;
    } else if (tm == 17) {
      indx = 11;
    } else if (tm === 18) {
      indx = 12;
    } else if (tm === 19) {
      indx = 13;
    } else if (tm === 20) {
      indx = 14;
    } else if (tm === 21) {
      indx = 15;
    } else if (tm === 22) {
      indx = 16;
    } else if (tm === 23) {
      indx = 17;
    } else if (tm === 24) {
      indx = 18;
    }
    console.log(tm, "-", indx);
    const q =
      "INSERT INTO events (`title`,`description`,`date`,`time`,`indx`, `startTime`,`endTime`,`ageGroup`,`trainer`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.description,
      req.body.date,
      req.body.timeFrame,
      indx,
      req.body.start,
      req.body.end,
      req.body.ageGroup,
      req.body.trainer,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getThisCustomerEvents = (req, res) => {
  const token = req.cookies.accessToken;
  const userId = parseInt(req.params.userId);
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "SELECT * FROM events INNER JOIN eventcustomers ON events.id = eventcustomers.eventId WHERE eventcustomers.userId = ?";

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const deleteEvent = (req, res) => {
  const token = req.cookies.accessToken;
  const eventId = parseInt(req.params.eventId);
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "DELETE FROM events WHERE `id` = ?";
    db.query(q, [eventId], (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json("Event not found");
      }

      return res.status(200).json("Event deleted successfully");
    });
  });
};
