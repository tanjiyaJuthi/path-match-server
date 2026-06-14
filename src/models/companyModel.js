import mongoose from "mongoose";
import { companySchema } from "../schemas/companySchema.js";

const Company =
  mongoose.models.Company ||
  mongoose.model("Company", companySchema);

export default Company;