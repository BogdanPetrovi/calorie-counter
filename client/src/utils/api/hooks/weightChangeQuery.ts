import { useQuery } from "@tanstack/react-query"
import { getWeightChange } from "../services/profile.service"

const useWeightChange = () => {
  return useQuery({
    queryKey: ['weight-change'],
    queryFn: getWeightChange
  })
}

export default useWeightChange