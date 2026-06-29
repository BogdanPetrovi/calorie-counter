import { useQuery } from "@tanstack/react-query"
import apiConnection from "../../services/apiConnection"
import type CaloriesIntakeInfo from "../../types/caloriesIntakeInfoTypes"

export const useCaloriesIntakeInfo = () => {
  return useQuery<CaloriesIntakeInfo, Error>({
    queryKey: ['calories-intake-info'],
    queryFn: async () => {
      const result = await apiConnection.get('/dashboard/recent-calories')
      return result.data
    }
  })
}