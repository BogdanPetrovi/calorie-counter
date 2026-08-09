import { useMutation } from "@tanstack/react-query"
import { register } from "../requests/auth.requests"

const useRegister = () => {
  return useMutation({
    mutationFn: ({ fullName, email, password }: { fullName: string, email: string; password: string; }) => register({ fullName, email, password })
  })
}

export default useRegister