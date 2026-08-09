import apiConnection from "../../../services/apiConnection"
import type MealLog from "../../../types/mealLogTypes"
import { isDemo, withDelay } from "../demo"
import { addMockMealLog, deleteMockMealLog, updateMockMealLog } from "../mocks/mealLog.mocks"

type NewMealPayload = Omit<MealLog, 'id' | 'createdAt'>

export const createMeal = async(payload: NewMealPayload) => {
  if(isDemo){
    const created = addMockMealLog(payload)
    return withDelay({ status: 201, data: created })
  }
  
  return apiConnection.post('/dashboard/add-meal', payload)
}

export const updateMeal = (id: number, payload: Partial<NewMealPayload>) => {
  if(isDemo){
    updateMockMealLog(id, payload)
    return withDelay({ status: 204 })
  }

  return apiConnection.patch('/dashboard/change-meal', { id, ...payload })
}

export const deleteMeal = (id: number) => {
  if(isDemo) {
    deleteMockMealLog(id)
    return withDelay({ status: 204 })
  }

  return apiConnection.delete(`/dashboard/delete-meal/${id}`)
}