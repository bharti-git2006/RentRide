import express from "express";
import { 
  ownerRequests, 
  approveOwnerRequest, 
  rejectOwnerRequest, 
  Allusersdata 
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Existing Routes
router.get("/owner-requests", authMiddleware, adminMiddleware, ownerRequests);
router.put("/owner-requests/:id/approve", authMiddleware, adminMiddleware, approveOwnerRequest);
router.put("/owner-requests/:id/reject", authMiddleware, adminMiddleware, rejectOwnerRequest);
router.get("/all-users", authMiddleware, adminMiddleware, Allusersdata);

// NEW: Add the stats route for the Admin Dashboard
router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // You can replace these hardcoded numbers with actual database counts later:
    // const users = await User.countDocuments();
    res.status(200).json({
      success: true,
      data: {
        users: 15,
        cars: 8,
        bookings: 4,
        trips: 12
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;