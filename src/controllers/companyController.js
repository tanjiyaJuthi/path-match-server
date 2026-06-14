import Company from "../models/companyModel.js";

export const getCompany = async (req, res) => {
    try {
        const query = {};

        if (req.query.recruiterId) {
            query.recruiterId = req.query.recruiterId;
        }

        const company = await Company.findOne(query);

        res.status(200).json(company || {});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const addCompany = async (req, res) => {
    try {
        const { recruiterId } = req.body;

        const existingCompany = await Company.findOne({
        recruiterId,
        });

        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "Company already exists for this recruiter",
            });
        }

        const company = await Company.create(req.body);

        res.status(201).json({
            success: true,
            company,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};