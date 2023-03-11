import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const makePay = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO transactions (	`client_id`,	`payment_order_id`,	`amount`,	`payer_id`,	`facilitatorAccessToken`,	`paymentSource`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.data[0].orderID,
      req.body.data[1].amount,
      req.body.data[0].payerID,
      req.body.data[0].facilitatorAccessToken,
      req.body.data[0].paymentSource,
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        const s = "SELECT * FROM client WHERE client_id = ?";
        db.query(s, [userInfo.id], (select_error, select_data) => {
          if (select_data.length === 0) {
            const insert =
              "INSERT INTO client (`client_id`,`balance` ) VALUES (?)";
            const inVal = [userInfo.id, req.body.data[1].amount];
            db.query(insert, [inVal], (inEr, inDt) => {
              if (inEr) return res.status(500).json(err);
              return res.status(200).send(req.body.data[0].amount);
            });
          } else {
            var newBal =
              parseFloat(req.body.data[1].amount) +
              parseFloat(select_data[0].balance);

            const updateBal =
              "UPDATE client SET `balance` = ? WHERE client_id = ?";
            const updateVal = [newBal];
            db.query(updateBal, [updateVal, userInfo.id], (upEr, upDt) => {
              if (upEr) return res.status(500).json(err);
              return res.status(200).json(newBal);
            });
          }
        });
      }
    });
  });
};

export const getPay = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM transactions WHERE client_id = ? ORDER BY id DESC";
    // const q =
    // "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const getBalance = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM client WHERE client_id = ?";
    // const q =
    // "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data[0]);
    });
  });
};

export const getAllPay = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT * FROM transactions  ORDER BY id DESC";

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const addPay = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO transactions (`client_id`,`amount`,`paymentSource`,`madeAt`, `currency`) VALUES (?)";
    const values = [
      req.body.customer,
      req.body.amount,
      req.body.payment_method,
      req.body.date,
      "KSH",
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};
