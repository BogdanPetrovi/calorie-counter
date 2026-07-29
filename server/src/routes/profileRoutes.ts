import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlware.js";
import { bmiAndMemberSince, updateUserData, weightChange } from "../controllers/profileController.js";

const router = Router();

router.post('/update-user-data', isLoggedIn, updateUserData)

router.get('/bmi-and-member-since', isLoggedIn, bmiAndMemberSince)

router.get('/weight-change', isLoggedIn, weightChange)

export default router