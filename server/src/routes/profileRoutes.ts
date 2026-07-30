import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddlware.js";
import { bmiAndMemberSince, logWeight, updateUserData, weightChange } from "../controllers/profileController.js";

const router = Router();

router.post('/update-user-data', isLoggedIn, updateUserData)

router.get('/bmi-and-member-since', isLoggedIn, bmiAndMemberSince)

router.get('/weight-change', isLoggedIn, weightChange)

router.post('/log-weight', isLoggedIn, logWeight)

export default router