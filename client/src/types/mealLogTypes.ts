import type { MealType } from "./mealTypeTypes";

export default interface MealLog {
  id: number,
  foodName: string,
  calories: number,
  mealType: MealType,
  createdAt: string,
  servingSize: string,
  servingMeasurment?: string
}