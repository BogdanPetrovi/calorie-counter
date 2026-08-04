import { useQuery } from "@tanstack/react-query"
import { getLogPages } from "../services/history.service"

const useLogPages = () => {
  return useQuery({
    queryKey: ['log-pages'],
    queryFn: getLogPages
  })
}

export default useLogPages