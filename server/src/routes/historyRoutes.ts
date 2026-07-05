import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlware.js";
import { historyStats } from "../controllers/historyController.js";

const router = Router();

router.get('/history-stats', isLoggedIn, historyStats)

export default router