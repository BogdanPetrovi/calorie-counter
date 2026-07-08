import { queryOptions } from "@tanstack/react-query"
import apiConnection from "../../services/apiConnection"
import type MealLog from "../../types/mealLogTypes"

const mealLogOptions = (page: number) => {
  return queryOptions({
    queryKey: ['meal-log', { page }],
    queryFn: () => getMealLog(page)
  })
}

const getMealLog = async (page: number): Promise<MealLog[]> => {
  const result = await apiConnection.get(`/history/meal-log?page=${page}`)
  console.log(result.data)
  return result.data
}

export default mealLogOptions