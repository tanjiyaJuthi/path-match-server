import mongoose from "mongoose";
import { jobSchema } from "../schemas/jobSchema.js";

export const Job = mongoose.model("Job", jobSchema);