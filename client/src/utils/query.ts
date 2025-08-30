import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import api from "../services/apiConnection"


export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchData,
    retry: (failureCount, error) => {
      if(axios.isAxiosError(error) && error.status === 401)
        return false
      return failureCount < 3
    },
    staleTime: 1000 * 60 * 5  
  })
}

const fetchData = async () => {
  const result = await api.get('/auth/getUserInfo')
  return result.data
}