import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
app.use(cookieParser());

//custom import
import JobRouter from "./routers/jobRouter.js";
import AuthRouter from "./routers/authRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import userRouter from "./routers/userRouter.js";

if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/jobs", authenticateUser, JobRouter);
app.use("/api/v1/Auth", AuthRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.get("*", (req, res) => {
  res.status(400).json({ msg: "not route found" });
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.Mongo_URL);
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
