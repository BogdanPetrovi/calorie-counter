import type { MealType } from "./mealTypeTypes";

export default interface CompleteMealType {
  id: number,
  mealType: MealType,
  foodName: string,
  calories: string,
  servingSize?: string,
  servingMeasurment?: string
}