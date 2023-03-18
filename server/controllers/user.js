import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import * as dotenv from "dotenv";
dotenv.config();

export const getCustomers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM users WHERE `userType` = ? ORDER BY id ASC";
    // const q =
    // "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId";
    db.query(q, ["customer"], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const getTrainers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM users WHERE `userType` = ? ORDER BY id ASC";
    // const q =
    // "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId";
    db.query(q, ["trainer"], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const search = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const { q } = req.query;
    const query = `SELECT * FROM yourtable WHERE column LIKE '%${q}%'`;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error executing query");
        return;
      }
      res.send(results);
    });
  });
};

export const getClient = (req, res) => {
  const token = req.cookies.accessToken;
  const client_id = parseInt(req.params.client_id);
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM users WHERE `id` = ?";

    db.query(q, [client_id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data[0]);
    });
  });
};

export const addUser = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const userEmail = req.body.email;
    const username = req.body.username;
    let date_ob = new Date();

    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Pro Swim Academy",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "User",
        intro: "Thank you for registering at Pro Swim Academy!",
        table: {
          data: [
            {
              username: username,
              description: "Registration",
              date: date_ob,
            },
          ],
        },
        outro: "Looking forward to start training you.",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Your Registration at Pro Swim Academy Was Successful",
      html: mail,
    };
    //CHECK USER IF EXISTS
    const q = "SELECT * FROM users WHERE email = ?";
    const values = [req.body.email];
    db.query(q, [values], async (error, data) => {
      if (error) return res.status(500).json(error);

      if (data.length) return res.status(409).json("user already exist!");
      // CREATE NEW USER
      //HASH PASSWORD

      const saltRounds = 10;

      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "INSERT INTO users (`username`,`email`,`password`, `userType`, `userAge`) VALUES (?)";
      const insertValues = [
        req.body.username,
        req.body.email,
        hash,
        req.body.user,
        req.body.userAge,
      ];

      db.query(q, [insertValues], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(process.env.EMAIL);
        console.log(userEmail);
        console.log();

        transporter
          .sendMail(message)
          .then(() => {
            return res.status(200).json("you should receive an email");
          })
          .catch((error) => {
            return res.status(500).json({ error });
          });
      });
      //STORE USER
    });
  });
};

export const assignToEvent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "SELECT * FROM eventcustomers WHERE `eventId` = ? AND `userId` = ?";

    db.query(q, [req.body[0], req.body[1]], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length > 0) {
        return res.status(404).json("Customer Already Assigned to this Class!");
      } else {
        const q = "INSERT INTO eventcustomers (`eventId`,`userId`) VALUES (?)";
        const values = [req.body[0], req.body[1]];
        db.query(q, [values], (errIn, dataIn) => {
          if (errIn) return res.status(500).json(errIn);

          const q = "SELECT * FROM events WHERE `id` = ?";
          db.query(q, [req.body[0]], (errSelect, dataSelect) => {
            if (errSelect) return res.status(500).json(errSelect);
            var count = dataSelect[0].noStudents;
            var newCount = count + 1;

            const q = "UPDATE events SET `noStudents` = ? WHERE `id` = ?";

            db.query(q, [newCount, req.body[0]], (errUpdate, dataUpdate) => {
              if (errUpdate) return res.status(500).json(errUpdate);
              res.status(200).json("Swimmer successfully assigned to event!");
            });
          });
        });
      }
    });
  });
};

export const deleteAssignedClass = (req, res) => {
  const token = req.cookies.accessToken;
  const assign_id = parseInt(req.params.assignId);
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM eventcustomers WHERE `id` = ?";
    db.query(q, [assign_id], (e, d) => {
      if (e) return res.status(500).json(e);
      const q = "DELETE FROM eventcustomers WHERE `id` = ?";

      db.query(q, [assign_id], (err, data) => {
        if (err) return res.status(500).json(err);

        const q = "SELECT * FROM events WHERE `id` = ? ";
        db.query(q, [d[0].eventId], (ee, dd) => {
          if (ee) return res.status(500).json(ee);
          if (dd[0]) {
            var initialCount = dd[0].noStudents;
            var updatedCount = initialCount - 1;
            const q = "UPDATE events SET `noStudents` = ? WHERE `id` = ?";
            const v = [updatedCount];
            db.query(q, [v, d[0].eventId], (eee, ddd) => {
              if (eee) return res.status(500).json(eee);
              return res.status(200).json("Removed Successfully!");
            });
          } else {
            return res.status(403).json("Token is not valid");
          }
        });
      });
    });
  });
};

export const deleteUser = (req, res) => {
  const token = req.cookies.accessToken;
  const client_id = parseInt(req.params.client_id);
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "DELETE FROM users WHERE `id` = ?";

    db.query(q, [client_id], (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(result.affectedRows + " user deleted");
    });
  });
};
