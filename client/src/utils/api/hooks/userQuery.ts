import { useQuery } from "@tanstack/react-query"
import type { CompletedUser } from "../../../types/userTypes"
import { getUser } from '../services/user.service'

export const useUser = () => {
  return useQuery<CompletedUser, Error>({
    queryKey: ['user'],
    queryFn: getUser,
  })
}