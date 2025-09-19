import { Navigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../../utils/userQuery"
import Loader from "../../components/general/Loader"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import GeneralInfoSection from "../../components/dashboard/GeneralInfoSection"

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
      <div className="xl:ml-96 mt-14 w-full py-9 px-5">
        <GeneralInfoSection user={ user } />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard