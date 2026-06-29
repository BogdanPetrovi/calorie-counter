import { useQuery } from "@tanstack/react-query"
import type MealsDay from "../../types/mealsDayTypes"
import apiConnection from "../../services/apiConnection"

export const useRecentMeals = () => {
  return useQuery<MealsDay, Error>({
    queryKey: ['recent-meals'],
    queryFn: async (): Promise<MealsDay> => {
      const result = await apiConnection.get('/dashboard/recent-meals')
      console.log(result.data)
      return result.data
    }
  })
}