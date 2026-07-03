import type { MealType } from "./mealTypeTypes"

export default interface MealsDay {
  today: MealInfo[],
  yesterday: MealInfo[]
}

interface MealInfo {
  meal: MealType,
  calories: number,
  foods: string
}