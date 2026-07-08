import axios from "axios"
import Loader from "../../components/shared/Loader"
import { useUser } from "../../utils/useQuery/userQuery"
import { Navigate } from "react-router-dom"

const IsAuthenticated = () => {
  const { data: user, isPending, isError, error } = useUser()
   
  if(isPending) return <Loader />

  if(isError && axios.isAxiosError(error) && error.status === 401)
    return <Navigate to={'/login'} />

   if(user)
    return <Navigate to={'/dashboard'} />
}

export default IsAuthenticated