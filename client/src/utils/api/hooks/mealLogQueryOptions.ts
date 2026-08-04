import { queryOptions } from "@tanstack/react-query"
import apiConnection from "../../../services/apiConnection"
import type MealLog from "../../../types/mealLogTypes"
import { isDemo, withDelay } from "../demo"
import { mockMealLogs } from "../mocks/mealLog.mocks"

const pageSize = 5

const mealLogOptions = (page: number) => {
  return queryOptions({
    queryKey: ['meal-log', { page }],
    queryFn: () => getMealLog(page)
  })
}

const getMealLog = async (page: number): Promise<MealLog[]> => {
  if(isDemo) {
    return getMockMealLog(page)
  }

  const result = await apiConnection.get(`/history/meal-log?page=${page}`)
  return result.data
}

const getMockMealLog = (page: number): Promise<MealLog[]> => {
  const start = ( page - 1 ) * pageSize
  const end = start + pageSize
  return withDelay(mockMealLogs.slice(start, end))
}

export default mealLogOptions