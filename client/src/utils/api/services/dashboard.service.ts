import apiConnection from "../../../services/apiConnection";
import type CaloriesIntakeInfo from "../../../types/caloriesIntakeInfoTypes";
import type MealsDay from "../../../types/mealsDayTypes";
import type WeeklyStats from "../../../types/weeklyStats";
import { isDemo, withDelay } from "../demo";
import { mockCaloriesIntakeInfo, mockRecentMeals, mockWeeklyStats } from "../mocks/dashboard.mocks";

export async function getCaloriesIntakeInfo(): Promise<CaloriesIntakeInfo> {
  if(isDemo){
    return withDelay(mockCaloriesIntakeInfo)
  }

  const result = await apiConnection.get('/dashboard/recent-calories')
  return result.data
}

export async function getRecentMeals(): Promise<MealsDay> {
  if(isDemo){
    return withDelay(mockRecentMeals)
  }

  const result = await apiConnection.get('/dashboard/recent-meals')
  return result.data
}

export async function getWeeklyStats(): Promise<WeeklyStats[]> {
  if(isDemo){
    return withDelay(mockWeeklyStats)
  }

  const result = await apiConnection.get('/dashboard/weekly-stats')
  return result.data.stats
}