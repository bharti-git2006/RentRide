import {
    signup,
    login,
    applyForOwner,
    approveOwner
} from "../services/authService.js";

export const signupUser = async (req, res) => {
    try {

        const user= await signup(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully. Please login."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

export const loginUser = async (req, res) => {
    try {

        const result = await login(req.body.email, req.body.password);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

export const applyOwner = async (req, res) => {
    try {

        await applyForOwner(req.user.id);

        res.status(200).json({
            success: true,
            message: "Owner request submitted successfully."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

export const approveOwnerRequest = async (req, res) => {
    try {

        await approveOwner(req.params.id);

        res.status(200).json({
            success: true,
            message: "Owner request approved successfully."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};
