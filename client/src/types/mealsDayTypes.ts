export default interface MealsDay {
  today: MealInfo[],
  yesterday: MealInfo[]
}

interface MealInfo {
  meal: MealType,
  calories: number,
  foods: string
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'