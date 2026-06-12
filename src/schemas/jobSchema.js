import mongoose from "mongoose";

export const jobSchema = new mongoose.Schema(
    {
        jobTitle: { 
            type: String, 
            required: true,
            trim: true
        },
        category: { 
            type: String, 
            required: true 
        },
        jobType: { 
            type: String, 
            required: true 
        },
        salaryMin: { 
            type: Number, 
            required: true 
        },
        salaryMax: { 
            type: Number, 
            required: true 
        },
        currency: { 
            type: String, 
            required: true,
            default: "USD"
        },
        isRemote: { 
            type: Boolean, 
            default: false 
        },
        location: { 
            type: String, 
            trim: true 
        },
        deadline: { 
            type: String,
            required: true 
        },
        responsibilities: { 
            type: String, 
            required: true,
            trim: true
        },
        requirements: { 
            type: String, 
            required: true,
            trim: true
        },
        benefits: { 
            type: String,
            trim: true 
        },
        status: {
            type: String,
            enum: ["active", "inactive", "draft"],
            default: "active"
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);