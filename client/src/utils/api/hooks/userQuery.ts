import { useQuery } from "@tanstack/react-query"
import type { CompletedUser } from "../../../types/userTypes"
import { getUser } from '../services/user.service'
import axios from "axios"

export const useUser = () => {
  return useQuery<CompletedUser, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    retry: (failureCount, error) => {
      if(axios.isAxiosError(error) && error.status === 401)
        return false
      return failureCount < 3
    }
  })
}