import { Router }  from 'express'
import { isLoggedIn } from '../middlewares/authMiddlware.js';
import { addFoodEntry, recentCalories } from '../controllers/dashboardController.js';

const router = Router();

router.post('/add-meal', isLoggedIn, addFoodEntry)

router.get('/recent-calories', isLoggedIn, recentCalories)

export default router