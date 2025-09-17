import { Navigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../../utils/userQuery"
import Loader from "../../components/general/Loader"
import DashboardLayout from "../../components/dashboard/DashboardLayout"

const Dashboard = () => {
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
    <DashboardLayout user={user}>
      <div className="p-4"></div>
    </DashboardLayout>
  )
}

export default Dashboard