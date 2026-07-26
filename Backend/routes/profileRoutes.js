import express from "express";

import {
    getUserProfile,
    updateUserProfile,
    changedPassword,
    updateProfilePhoto
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getUserProfile
);

router.put(
    "/update",
    authMiddleware,
    updateUserProfile
);

router.put(
    "/change-password",
    authMiddleware,
    changedPassword
);

router.put(
    "/profile-photo",
    authMiddleware,
    uploadMiddleware.single("profilePhoto"),
    updateProfilePhoto
);

export default router;