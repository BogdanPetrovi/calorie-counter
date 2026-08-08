import { useMutation } from "@tanstack/react-query"
import { deleteMeal } from "../requests/meal.requests"
import { useToast } from "../../../context/ToastContext"
import { useInvalidateData } from '../../refetch'
import { AxiosError } from "axios"

const useDeleteLogEntry = () => {
  const { showToast } = useToast()
  const { invalidateAll } = useInvalidateData()

  return useMutation({
    mutationFn: (id: number) => deleteMeal(id),
    onSuccess: () => {
      showToast("Successfully deleted meal!", 'success')
      invalidateAll()
    },
    onError: (err) => {
      if(err instanceof AxiosError){
        showToast(err.response?.data.message || err.message, 'error')
        return
      }

      showToast(`Couldn't delete this row, try again!`, 'error')
    }
  })
}

export default useDeleteLogEntry