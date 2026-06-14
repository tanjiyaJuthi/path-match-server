import mongoose from "mongoose";

export const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        websiteUrl: {
            type: String,
            required: true,
            trim: true,
        },

        industry: {
            type: String,
            enum: ["Technology", "Design", "Marketing", "Finance"],
            default: "Technology",
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        employeeCount: {
            type: String,
            enum: [
                "1-10 employees",
                "11-50 employees",
                "51-200 employees",
                "201+ employees",
            ],
            default: "1-10 employees",
        },

        description: {
            type: String,
            default: "",
        },

        logo: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },

        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // one company per recruiter
        },
    },
    {
        timestamps: true,
    }
);