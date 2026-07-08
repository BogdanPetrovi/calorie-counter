import { useQuery } from "@tanstack/react-query"
import type HistoryStats from "../../types/HistoryStats"
import apiConnection from "../../services/apiConnection"

export const useHistoryStats = () => {
  return useQuery({
    queryKey: ['history-stats'],
    queryFn: async ():Promise<HistoryStats> => {
      const result = await apiConnection.get('/history/history-stats')
      return result.data
    }
  })
}