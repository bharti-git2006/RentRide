import express from "express";

import { createCar, getAllCars, getCarById, updateCar, removeCar, updateAvailabilityStatus,popularCars,recommendedCars } from "../controllers/carController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

//customer routes
router.get("/", getAllCars);
router.get("/popular",popularCars);
router.get("/recommended",authMiddleware,recommendedCars);
router.get("/:id",  getCarById);


// Admin or Owner Routes
router.post( "/", authMiddleware,uploadMiddleware.array("image", 3), createCar);

router.put("/:id", authMiddleware,uploadMiddleware.array("image", 3), updateCar );

router.delete("/:id", authMiddleware,removeCar );

router.put("/:id/availability", authMiddleware, updateAvailabilityStatus);

export default router;