import { Router }  from 'express'
import { isLoggedIn } from '../middlewares/authMiddlware.js';
import { addFoodEntry, changeMeal, recentCalories, recentMeals, weeklyStats } from '../controllers/dashboardController.js';

const router = Router();

router.post('/add-meal', isLoggedIn, addFoodEntry)

router.patch('/change-meal', isLoggedIn, changeMeal)

router.get('/recent-calories', isLoggedIn, recentCalories)

router.get('/recent-meals', isLoggedIn, recentMeals)

router.get('/weekly-stats', isLoggedIn, weeklyStats)

export default router