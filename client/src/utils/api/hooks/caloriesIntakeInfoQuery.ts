import { useQuery } from "@tanstack/react-query"
import type CaloriesIntakeInfo from "../../../types/caloriesIntakeInfoTypes"
import { getCaloriesIntakeInfo } from "../services/dashboard.service"

export const useCaloriesIntakeInfo = () => {
  return useQuery<CaloriesIntakeInfo, Error>({
    queryKey: ['calories-intake-info'],
    queryFn: getCaloriesIntakeInfo
  })
}