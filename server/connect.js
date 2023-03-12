import mysql from "mysql";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.ROOT_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

db.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + db.threadId);
});
