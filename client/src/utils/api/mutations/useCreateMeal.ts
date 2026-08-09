import { useMutation } from "@tanstack/react-query"
import type MealLog from "../../../types/mealLogTypes"
import { createMeal } from "../requests/meal.requests"
import { useToast } from "../../../context/ToastContext"
import { useInvalidateData } from "../../refetch"
import { AxiosError } from "axios"

type NewMealPayload = Omit<MealLog, 'id' | 'createdAt'>

const useCreateMeal = () => {
  const { showToast } = useToast()
  const { invalidateAll } = useInvalidateData()

  return useMutation({
    mutationFn: (payload: NewMealPayload) => createMeal(payload),
    onSuccess: ({ data }) => {
      showToast(`Succesfuly added your ${data.mealType}!`, 'success')
      invalidateAll()
    },
    onError: (err) => {
      if(err instanceof AxiosError){
        showToast(err.response?.data.message || err.message, 'error')
        return
      }

      showToast(`Couldn't update your meal, try again!`, 'error')
    }
  })
}

export default useCreateMeal