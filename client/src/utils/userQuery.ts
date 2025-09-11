import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import api from "../services/apiConnection"
import type { CompletedUser } from "../types/userTypes"
import transformUser from "./transformUser"


export const useUser = () => {
  return useQuery<CompletedUser, Error>({
    queryKey: ['user'],
    queryFn: fetchUserData,
    retry: (failureCount, error) => {
      if(axios.isAxiosError(error) && error.status === 401)
        return false
      return failureCount < 3
    },
    staleTime: 1000 * 60 * 5
  })
}

const fetchUserData = async () => {
  const result = await api.get('/auth/getUserInfo')
  return transformUser(result.data)
}