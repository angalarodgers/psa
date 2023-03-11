import mysql from "mysql";
import mongoose from "mongoose";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proswim_db",
});
