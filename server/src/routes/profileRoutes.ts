import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlware.js";
import { updateUserData } from "../controllers/profileController.js";

const router = Router();

router.post('/update-user-data', isLoggedIn, updateUserData)

export default router