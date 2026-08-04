import { useQuery } from "@tanstack/react-query"
import { getRecentMeals } from "../services/dashboard.service"

export const useRecentMeals = () => {
  return useQuery({
    queryKey: ['recent-meals'],
    queryFn: getRecentMeals
  })
}