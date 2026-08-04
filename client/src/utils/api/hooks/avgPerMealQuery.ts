import { useQuery } from "@tanstack/react-query"
import { getAvgPerMeal } from "../services/history.service"

const useAvgPerMeal = () => {
  return useQuery({
    queryKey: ['avg-per-meal'],
    queryFn: getAvgPerMeal
  })
}

export default useAvgPerMeal