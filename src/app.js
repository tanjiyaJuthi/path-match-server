import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import cors from "cors";
import 'dotenv/config';
import express from "express";

import { connectMongoose } from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.BETTER_AUTH_URL,
  credentials: true,
}));
app.use(express.json());

await connectMongoose();

// to check if endpoint is working or not
// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

// routes
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;