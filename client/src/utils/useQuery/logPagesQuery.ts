import { useQuery } from "@tanstack/react-query"
import apiConnection from "../../services/apiConnection"

const useLogPages = () => {
  return useQuery({
    queryKey: ['log-pages'],
    queryFn: async ():Promise<number> => {
      const result = await apiConnection.get('/history/log-pages')
      return result.data.pages
    }
  })
}

export default useLogPages