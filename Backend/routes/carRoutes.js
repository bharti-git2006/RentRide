import express from "express";

import { createCar, getAllCars, getCarById, updateCar, removeCar, updateAvailabilityStatus,popularCars,recommendedCars, pendingCarRequests, reviewCarRequest } from "../controllers/carController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

//customer routes
router.get("/", getAllCars);
router.get("/popular",popularCars);
router.get("/recommended",recommendedCars);
router.get("/pending",authMiddleware,adminMiddleware,pendingCarRequests);

router.get("/:id",  getCarById);
router.post( "/", authMiddleware,uploadMiddleware.array("image", 3), createCar);
router.put("/:id/review",authMiddleware,adminMiddleware,reviewCarRequest);
router.put("/:id", authMiddleware,uploadMiddleware.array("image", 3), updateCar );
router.delete("/:id", authMiddleware,removeCar );
router.put("/:id/availability", authMiddleware, updateAvailabilityStatus);

export default router;