import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePersonalInfo } from "../requests/user.requests"
import { useToast } from "../../../context/ToastContext"
import { AxiosError } from "axios"

const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  
  return useMutation({
    mutationFn: ({ name, email}: { name: string, email: string }) => updatePersonalInfo(name, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      showToast('You succesfuly changed personal info!', 'success')
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

export default useUpdatePersonalInfo