import { Router } from "express";

import UserRoute from "./user.route.js";
import AuthRoute from "./auth.route.js";

const IndexRoute = Router();

IndexRoute.get("/", (req, res) => res.send("Hey from server"));
IndexRoute.use("/user", UserRoute);
IndexRoute.use("/auth", AuthRoute);



export default IndexRoute;
