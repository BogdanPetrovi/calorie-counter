import { useQuery } from "@tanstack/react-query"
import { getHistoryStats } from "../services/history.service"

export const useHistoryStats = () => {
  return useQuery({
    queryKey: ['history-stats'],
    queryFn: getHistoryStats
  })
}