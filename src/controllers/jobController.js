import { Job } from '../models/jobModel.js';

// get job
export const getJobs = async (req, res) => {
  try {
    const { status, companyId } = req.query;
    const query = { createdBy: req.user.id };

    if (status) query.status = status;
    if (companyId) query.companyId = companyId;

    const result = await Job.find(query).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
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
        const userId = req.user.id;

        const requiredFields = [
            "jobTitle",
            "companyId",
            "category",
            "jobType",
            "salaryMin",
            "salaryMax",
            "currency",
            "deadline",
            "responsibilities",
            "requirements",
        ];

        // validate required fields
        const missingFields = requiredFields.filter((field) => {
            const value = job?.[field];

            return value === undefined || value === null || value.toString().trim() === "";
        });

        if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
            missingFields,
        });
        }

        // normalize salary values
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
            message: "Minimum salary cannot be greater than maximum salary",
        });
        }

        // remote handling
        const isRemote = Boolean(job.isRemote);

        job.location = isRemote
        ? "Remote"
        : `${job.city || ""}, ${job.country || ""}`.trim();

        // basic cleanup
        job.responsibilities = job.responsibilities?.trim();
        job.requirements = job.requirements?.trim();
        job.benefits = job.benefits?.trim();

        // create job
        const newJob = await Job.create({
            ...job,
            isRemote,
            status: job.status || "active",
            createdBy: userId,
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

