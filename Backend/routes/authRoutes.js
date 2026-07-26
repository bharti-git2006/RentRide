import express from "express";

import { signupUser, loginUser, applyOwner, approveOwnerRequest } from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

// Customer Routes
router.patch("/apply-owner", authMiddleware, applyOwner);

// Admin Routes
router.patch(
    "/approve-owner/:id",
    authMiddleware,
    adminMiddleware,
    approveOwnerRequest
);

export default router;