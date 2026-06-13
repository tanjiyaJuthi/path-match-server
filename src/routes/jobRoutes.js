import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import {
    addJob,
    getJobs
} from "../controllers/jobController.js";

const jobRoutes = express.Router();

jobRoutes.post(
    "/",
    verifyToken,
    addJob
);

jobRoutes.get(
    "/",
    verifyToken,
    getJobs
);

export default jobRoutes;