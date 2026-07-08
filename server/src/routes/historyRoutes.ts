import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlware.js";
import { historyStats, logPages, mealLogPage } from "../controllers/historyController.js";

const router = Router();

router.get('/history-stats', isLoggedIn, historyStats)

router.get('/meal-log', isLoggedIn, mealLogPage)

router.get('/log-pages', isLoggedIn, logPages)

export default router