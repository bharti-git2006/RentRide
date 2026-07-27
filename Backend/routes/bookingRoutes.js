import express from "express";

import {  createBooking,  getAllBookings,  getBookingById,  updateBooking,  removeBooking,  confirmBookingStatus,completedBookingStatus
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post( "/", authMiddleware, createBooking );

router.get( "/",  authMiddleware,  getAllBookings);

router.get( "/:id",  authMiddleware,  getBookingById);

router.put( "/:id",  authMiddleware,  updateBooking);

router.put( "/:id/cancel",  authMiddleware,  removeBooking);

router.put("/:id/confirm",  authMiddleware,  adminMiddleware, confirmBookingStatus);

router.put( "/:id/complete", authMiddleware, adminMiddleware, completedBookingStatus);
 

export default router;