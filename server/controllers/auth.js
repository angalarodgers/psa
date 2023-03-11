import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import * as dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
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
      "INSERT INTO users (`username`,`email`,`password`, `userType`) VALUES (?)";
    const insertValues = [
      req.body.username,
      req.body.email,
      hash,
      req.body.user,
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
};

export const login = async (req, res) => {
  //SELECT USER
  const q = "SELECT * FROM users  WHERE email = ?";
  const values = [req.body.email];
  db.query(q, [values], async (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) return res.status(404).json("User Not Found!");
    console.log(data[0].password);
    console.log(req.body.password);
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkPassword)
      return res.status(400).json("Wrong username or password");
    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out!");
};

export const sendOtp = async (req, res) => {
  const rand = Math.random();
  const otp = Math.round(rand * 900000 + 100000);

  console.log(otp);
  const userEmail = req.body.email;
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
      intro: "Password Reset OTP!",
      table: {
        data: [
          {
            OTP: otp,
            date: date_ob,
          },
        ],
      },
      outro: "Your request to reset password was received.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "OTP Request Was Successful",
    html: mail,
  };
  //CHECK USER IF EXISTS
  const q = "SELECT * FROM users WHERE email = ?";
  const values = [req.body.email];
  db.query(q, [values], async (error, data) => {
    if (error) return res.status(500).json(error);

    if (!data.length) return res.status(409).json("user does not exist!");

    // SAVE OTP

    const q = "UPDATE users SET `otp` = ? WHERE `email` = ?";
    const insertValues = [otp];

    db.query(q, [insertValues, req.body.email], (err, data) => {
      if (err) return res.status(501).json(err);
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
};

export const confirmOTP = async (req, res) => {
  //SELECT USER
  const q = "SELECT * FROM users  WHERE email = ?";
  const values = [req.body.email];
  db.query(q, [values], async (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) return res.status(404).json("User Not Found!");
    console.log(data[0].otp);
    console.log(req.body.otp);

    if (!data[0].otp === req.body.otp) return res.status(400).json("Wrong OTP");
    const q = "UPDATE users SET `otp` = ? WHERE `email` = ?";

    db.query(q, ["", req.body.email], (err, data) => {
      if (err) return res.status(405).json(err);
      return res.status(200).json("You can change your password now!");
    });
  });
};

export const changePassword = async (req, res) => {
  //SELECT USER
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const q = "UPDATE users SET `password` = ? WHERE `email` = ?";
  const pass = [hash];
  db.query(q, [pass, req.body.email], (err, data) => {
    if (err) return res.status(405).json(err);
    return res.status(200).json("You can change your password now!");
  });
};
