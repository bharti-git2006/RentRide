import express from "express";
import { chatWithAI } from "../controllers/aiController.js"; 

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ message: "AI route working" });
});

router.post("/chat", chatWithAI);

export default router;