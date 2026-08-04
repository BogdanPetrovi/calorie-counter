import { useQuery } from "@tanstack/react-query"
import apiConnection from "../../services/apiConnection"
import type BmiAndMemberSince from "../../types/bmiAndMemberSinceTypes"

const useBmiAndMemberSince = () => {
  return useQuery({
    queryKey: ['bmi-and-member-since'],
    queryFn: async ():Promise<BmiAndMemberSince> => {
      const result = await apiConnection.get('/profile/bmi-and-member-since')
      return result.data
    }
  })
}

export default useBmiAndMemberSince