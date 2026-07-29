import express from "express";
import { ownerRequests, approveOwnerRequest, rejectOwnerRequest, Allusersdata } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/owner-requests", authMiddleware, adminMiddleware, ownerRequests);

router.put(  "/owner-requests/:id/approve",  authMiddleware,  adminMiddleware,  approveOwnerRequest);

router.put(  "/owner-requests/:id/reject",  authMiddleware,  adminMiddleware,  rejectOwnerRequest);

router.get("/all-users", authMiddleware,adminMiddleware, Allusersdata);

export default  router
