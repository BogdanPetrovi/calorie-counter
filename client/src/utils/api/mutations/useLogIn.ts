import { useMutation } from "@tanstack/react-query"
import { logIn } from "../requests/auth.requests"

const useLogIn = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string; }) => logIn({ email, password })
  })
}

export default useLogIn