import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import * as dotenv from "dotenv";
const PORT = process.env.PORT || 5000;
const app = express();

import authRoutes from "./routes/auths.js";
import payRoutes from "./routes/pays.js";
import userRoutes from "./routes/users.js";
import eventRoutes from "./routes/events.js";

//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
    ],
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/pay", payRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log("API PWS RUNNING", PORT);
});
