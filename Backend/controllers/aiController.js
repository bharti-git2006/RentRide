import { askAI } from "../utils/ai.js";

export const chatWithAI = async (req, res) => {
    try {
        const { prompt } = req.body;

        const answer = await askAI(prompt);

        res.json({
            success: true,
            answer,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "AI request failed",
        });
    }
};