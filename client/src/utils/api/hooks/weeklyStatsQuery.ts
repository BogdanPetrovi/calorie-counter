import { useQuery } from "@tanstack/react-query"
import { getWeeklyStats } from "../services/dashboard.service"

export const useWeeklyStats = () => {
  return useQuery({
    queryKey: ['weekly-stats'],
    queryFn: getWeeklyStats
  })
}