import { useMutation } from "@tanstack/react-query"
import { changePassword } from "../requests/auth.requests"
import { useToast } from "../../../context/ToastContext"
import { AxiosError } from "axios"

const useChangePassword = () => {
  const { showToast } = useToast()
  
  return useMutation({
    mutationFn: ({ password, newPassword }: { password: string, newPassword: string }) => {
      return changePassword({ password, newPassword })
    },
    onSuccess: () => {
      showToast('You successfully changed your password!')
    },
    onError: (err) => {
      //handled in the component
      if(err instanceof AxiosError) return

      showToast("We were unable to change your password, please try again")
    }
  })
}

export default useChangePassword