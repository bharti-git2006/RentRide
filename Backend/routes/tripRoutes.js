import express from "express";

import {
    startTripController,
    getLiveLocationController,
    getTripHistoryController,
    getTripStatsController,
    completeTripController
} from "../controllers/tripController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/start/:bookingId",
    authMiddleware,
    startTripController
);


// Current Live Location
router.get(
    "/live/:tripId",
    authMiddleware,
    getLiveLocationController
);

// Complete Route History


router.get(
    "/history/:tripId",
    authMiddleware,
    getTripHistoryController
);
router.get(
    "/stats/:tripId",
    authMiddleware,
    getTripStatsController
);

// Complete Trip

router.patch(
    "/complete/:tripId",
    authMiddleware,
    completeTripController
);


export default router;