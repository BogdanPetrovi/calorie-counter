import axios from "axios"
import Loader from "../components/general/Loader"
import { useUser } from "../utils/useQuery/userQuery"
import { Navigate } from "react-router-dom"
import Layout from "../components/shared/layout/Layout"

const History = () => {
  const { data: user, isPending, isError, error } = useUser()

  if (isPending) 
    return <Loader />

  if (isError)
    if(axios.isAxiosError(error) && error.status === 401)
      return <Navigate to={'/login'} />

  if (!user) 
    return <Navigate to={'/login'} />

  if(!user.targetDailyCalories)
    return <Navigate to={'/setup'} />

  return (
    <Layout>
      <div></div>
    </Layout>
  )
}

export default History