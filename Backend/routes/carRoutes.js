import express from "express";

import { createCar, getAllCars, getCarById, updateCar, removeCar, updateAvailabilityStatus,popularCars,recommendedCars } from "../controllers/carController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

//customer routes
router.get("/", getAllCars);
router.get("/popular",popularCars);
router.get("/recommended",recommendedCars);
router.get("/:id",  getCarById);


// Admin Routes
router.post(  "/",  authMiddleware,  adminMiddleware,  uploadMiddleware.array("images", 3),  createCar);

router.put("/:id",  authMiddleware,  adminMiddleware,  uploadMiddleware.array("images", 3),  updateCar );

router.delete("/:id",  authMiddleware,  adminMiddleware,  removeCar );

router.put("/:id/availability",   authMiddleware,   adminMiddleware,   updateAvailabilityStatus);

export default router;