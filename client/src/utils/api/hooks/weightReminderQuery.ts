import { useQuery } from "@tanstack/react-query"
import { getWeightReminder } from "../services/general.service"

const useWeightReminder = () => {
  return useQuery({
    queryKey: ['weight-reminder'],
    queryFn: getWeightReminder
  })
}

export default useWeightReminder