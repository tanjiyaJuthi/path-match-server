import { Job } from '../models/jobModel.js';
import mongoose from "mongoose";

// get job
export const getJobs = async (req, res) => {
    try {
        const { status, companyId } = req.query;
        const query = {};

        if (status) query.status = status;
        if (companyId) query.companyId = companyId;

        const result = await Job.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// get job by id
export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID",
            });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// add job
export const addJob = async (req, res) => {
    try {
        const job = req.body;

        const requiredFields = [
            "jobTitle",
            "companyId",
            "jobCategory",
            "jobType",
            "minSalary",
            "maxSalary",
            "currency",
            "deadline",
            "responsibilities",
            "requirements",
        ];

        const missingFields = requiredFields.filter((field) => {
            const value = job?.[field];

            return value === undefined || value === null || value === "";
        });

        if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
            missingFields,
        });
        }

        job.salaryMin = Number(job.salaryMin);
        job.salaryMax = Number(job.salaryMax);

        if (Number.isNaN(job.salaryMin) || Number.isNaN(job.salaryMax)) {
        return res.status(400).json({
            success: false,
            message: "Salary must be valid numbers",
        });
        }

        if (job.salaryMin > job.salaryMax) {
        return res.status(400).json({
            success: false,
            message:
            "Minimum salary cannot be greater than maximum salary",
        });
        }

        const isRemote = job.isRemote === true || job.isRemote === "true";

        if (!isRemote && !job.location) {
            return res.status(400).json({
                success: false,
                message: "Location required for non-remote job",
            });
        }

        job.responsibilities = String(job.responsibilities || "").trim();
        job.requirements = String(job.requirements || "").trim();
        job.benefits = String(job.benefits || "").trim();

        const newJob = await Job.create({
            ...job,
            isRemote,
            status: job.status || "active",
        });

        return res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: newJob,
        });
    } catch (error) {
        console.error("POST /job error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

