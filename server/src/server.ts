import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDb } from "./Config/database";

// Call Routes
import IndexRouter from "./Routes/index.Routes";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // Server can extract req.body
app.use(cookieParser());
app.use(cors());

app.use("/api", IndexRouter);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});
