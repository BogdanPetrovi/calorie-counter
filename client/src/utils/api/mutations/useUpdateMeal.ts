import { useMutation } from "@tanstack/react-query"
import { updateMeal } from "../requests/meal.requests"
import type MealLog from "../../../types/mealLogTypes"
import { useToast } from "../../../context/ToastContext"
import { useInvalidateData } from "../../refetch"
import { AxiosError } from "axios"

type NewMealPayload = Omit<MealLog, 'id' | 'createdAt'>

const useUpdateMeal = () => {
  const { showToast } = useToast()
  const { invalidateAll } = useInvalidateData()
  
  
  return useMutation({
    mutationFn: ({id, payload} : {id: number, payload: NewMealPayload}) => updateMeal(id, payload),
    onSuccess: () => {
      showToast('Succesfuly updated your meal!', 'success')
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

export default useUpdateMeal