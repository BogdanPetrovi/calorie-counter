import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateWeight } from "../requests/user.requests"
import { useToast } from "../../../context/ToastContext"
import { AxiosError } from "axios"

const useUpdateWeight = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  
  return useMutation({
    mutationFn: (weight: number) => updateWeight(weight),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['weight-change'] })
      queryClient.invalidateQueries({ queryKey: ['bmi-and-member-since'] })
      showToast('You succesfully updated your weight!')
    },
    onError: (err) => {
      if(err instanceof AxiosError){
        showToast(err.response?.data.message || err.message, 'error')
        return
      }
      showToast(`Updating weight failed, try again!`, 'error')
    }
  })
}

export default useUpdateWeight