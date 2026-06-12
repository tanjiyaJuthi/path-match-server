import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import { addJob } from "../controllers/jobController.js";

const jobRoutes = express.Router();

jobRoutes.post(
    "/",
    verifyToken,
    addJob
);

export default jobRoutes;