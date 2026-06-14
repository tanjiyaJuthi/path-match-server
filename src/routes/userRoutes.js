import express from "express";

import {verifyToken} from "../middleware/verifyToken.js";
import { getUsers } from "../controllers/userController.js";

export const userRoutes =  express.Router();

userRoutes.get(
    "/",
    getUsers
);

export default userRoutes;