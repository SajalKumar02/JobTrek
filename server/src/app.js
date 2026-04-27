import express from "express";
import IndexRoute from "./routes/index.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));

app.use("/api", IndexRoute);

export { app };
