import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import {
    addJob,
    getJobs
} from "../controllers/jobController.js";

const jobRoutes = express.Router();

jobRoutes.post(
    "/",
    addJob
);

jobRoutes.get(
    "/",
    getJobs
);

export default jobRoutes;