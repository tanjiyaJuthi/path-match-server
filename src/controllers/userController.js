import { User } from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().skip(6);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};