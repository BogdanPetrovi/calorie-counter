import { useQuery } from "@tanstack/react-query"
import apiConnection from "../../services/apiConnection"
import type AvgPerMeal from "../../types/avgPerMealTypes"

const useAvgPerMeal = () => {
  return useQuery({
    queryKey: ['avg-per-meal'],
    queryFn: async (): Promise<AvgPerMeal> => {
      const result = await apiConnection.get('/history/avg-per-meal')
      return result.data
    }
  })
}

export default useAvgPerMeal