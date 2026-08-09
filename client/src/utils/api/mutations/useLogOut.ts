import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logOut } from "../requests/auth.requests"
import { useToast } from "../../../context/ToastContext"
import { AxiosError } from "axios"

const useLogOut = () => {
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] })
      showToast("You succesfully logged out!")
    },
    onError: (err) => {
      if(err instanceof AxiosError){
        showToast(err.response?.data.message || err.message, "error")
        return
      }

      showToast("We couldn't log you out at the moment, please try again.", 'error')
    }
  })
}

export default useLogOut