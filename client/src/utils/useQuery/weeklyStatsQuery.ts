import { useQuery } from "@tanstack/react-query"
import type WeeklyStats from "../../types/weeklyStats"
import apiConnection from "../../services/apiConnection"

export const useWeeklyStats = () => {
  return useQuery<WeeklyStats[], Error>({
    queryKey: ['weekly-stats'],
    queryFn: async (): Promise<WeeklyStats[]> => {
      const result = await apiConnection.get('/dashboard/weekly-stats')
      return result.data.stats
    }
  })
}