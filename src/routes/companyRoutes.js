import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import { addCompany, getCompany } from "../controllers/companyController.js";

const companyRoutes = express.Router();

companyRoutes.get(
    "/",
    getCompany
);

companyRoutes.post(
    "/",
    addCompany
);


export default companyRoutes;