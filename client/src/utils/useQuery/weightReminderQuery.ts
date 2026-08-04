import { useQuery } from "@tanstack/react-query"
import apiConnection from "../../services/apiConnection"

const useWeightReminder = () => {
  return useQuery({
    queryKey: ['weight-reminder'],
    queryFn: async () => {
      const result = await apiConnection.get('/general/weight-reminder')
      return result.data.show
    }
  })
}

export default useWeightReminder