import type React from "react"
import type { AdditionalUserData } from "../../types/userTypes"
import api from "../../services/apiConnection"
import Loader from "../general/Loader"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"


interface EndProps {
  userData: AdditionalUserData
}

const End:React.FC<EndProps> = ({ userData }) => {
  const postUserData = async () => {
    const result = await api.post('/setup', userData)
    return result
  }

  const { isPending } = useQuery({
    queryKey: ['postUserData'],
    queryFn: postUserData, 
  })

  if (isPending) 
    return <Loader />

  return <Navigate to={'/dashboard'} />
}

export default End