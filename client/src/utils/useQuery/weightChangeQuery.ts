import { useQuery } from "@tanstack/react-query"
import apiConnection from "../../services/apiConnection"
import type WeightChangeRow from "../../types/weightChangeTypes"

const useWeightChange = () => {
  return useQuery({
    queryKey: ['weight-change'],
    queryFn: async (): Promise<WeightChangeRow[]> => {
      const result = await apiConnection.get('/profile/weight-change')
      return result.data
    }
  })
}

export default useWeightChange