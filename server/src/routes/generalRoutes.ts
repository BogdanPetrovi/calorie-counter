import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlware.js";
import { weightReminder } from '../controllers/generalController.js'

const router = Router();

router.get('/weight-reminder', isLoggedIn, weightReminder)

export default router