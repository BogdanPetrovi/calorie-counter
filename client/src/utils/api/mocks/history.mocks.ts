import type AvgPerMeal from "../../../types/avgPerMealTypes";
import type HistoryStats from "../../../types/HistoryStats";
import type { MealType } from "../../../types/mealTypeTypes";
import { getDaysAgo } from "../../mockDateHelper";
import { mockMealLogs } from "./mealLog.mocks";

const calculateAvgPerMeal = (): AvgPerMeal => {
  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']
  const lastWeek = mockMealLogs.filter(val => getDaysAgo(val.createdAt) < 8)
  const result = {} as AvgPerMeal

  for(const type of mealTypes) {
    const filterType = lastWeek.filter(val => val.mealType === type)
    const total = filterType.reduce((sum, val) => val.calories + sum, 0)

    result[type] = filterType.length > 0 ? Number((total / filterType.length).toFixed(2)) : 0
  }

  return result
}

export const mockAvgPerMeal: AvgPerMeal = calculateAvgPerMeal()

export const mockLogPages: number = Math.ceil(mockMealLogs.length / 5);

export const calculateAverageMeal = (): number => {
  const avg = mockMealLogs.reduce((sum, val) => val.calories + sum, 0)
  return Number((avg / mockMealLogs.length).toFixed(2))
}

export const mockHistoryStats: HistoryStats = {
  streak: 7,
  averageMeal: calculateAverageMeal(),
  mostEatenFood: 'Oatmeal with bananas and berries'
}