import express from "express";

import {  createBooking,  getAllBookings,  getBookingById,  updateBooking,  removeBooking,completedBookingStatus, OwnerBookings, ownerRevenue
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post( "/", authMiddleware, createBooking );

router.get( "/",  authMiddleware,  getAllBookings);

router.get("/owner",authMiddleware,OwnerBookings);

router.get("/owner-revenue",authMiddleware,ownerRevenue);

router.get( "/:id",  authMiddleware,  getBookingById);

router.put( "/:id",  authMiddleware,  updateBooking);

router.put( "/:id/cancel",  authMiddleware,  removeBooking);

router.put( "/:id/complete", authMiddleware, completedBookingStatus); //not sure about this

 

export default router;