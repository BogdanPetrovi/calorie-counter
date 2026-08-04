import { useQuery } from "@tanstack/react-query"
import { getBmiAndMemberSince } from "../services/profile.service"

const useBmiAndMemberSince = () => {
  return useQuery({
    queryKey: ['bmi-and-member-since'],
    queryFn: getBmiAndMemberSince
  })
}

export default useBmiAndMemberSince