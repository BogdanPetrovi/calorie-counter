import type CaloriesIntakeInfo from "../../../types/caloriesIntakeInfoTypes";
import type MealsDay from "../../../types/mealsDayTypes";
import type { Days } from "../../../types/weeklyStats";
import type WeeklyStats from "../../../types/weeklyStats";
import { getDaysAgo } from "../../mockDateHelper";
import { mockMealLogs } from "./mealLog.mocks";

const sumCaloriesForDay = (daysAgo: number): number => {
  return mockMealLogs.filter(val => getDaysAgo(val.createdAt) === daysAgo).reduce((sum, val) => sum + val.calories, 0)
}

export const mockCaloriesIntakeInfo = (): CaloriesIntakeInfo => ({
  today: sumCaloriesForDay(0) > 0 ? sumCaloriesForDay(0) : null,
  yesterday: sumCaloriesForDay(1) > 0 ? sumCaloriesForDay(1) : null
})

const getMealsForDay = (daysAgo: number) => {
  return mockMealLogs
    .filter(val => getDaysAgo(val.createdAt) === daysAgo)
    .map(val => ({
      meal: val.mealType,
      calories: val.calories,
      foods: val.foodName
    }))
}

export const mockRecentMeals = (): MealsDay => ({
  today: getMealsForDay(0),
  yesterday: getMealsForDay(1)
})

const calculateWeeklyStats = () => {
  const dayNames: Days[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const result: WeeklyStats[] = [];

  for(let i = 0; i < 7; i++){
    const date = new Date();
    date.setDate(date.getDate() - i)

    const dayName = dayNames[date.getDay()]

    result.push({
      day: dayName,
      calories: sumCaloriesForDay(i)
    })
  }

  return result.reverse()
}

export const mockWeeklyStats = (): WeeklyStats[] => calculateWeeklyStats()