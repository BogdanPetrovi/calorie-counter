import { Navigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../utils/useQuery/userQuery"
import Loader from "../components/general/Loader"
import Layout from "../components/shared/layout/Layout"
import GeneralInfoSection from "../components/dashboard/GeneralInfoSection"
import CaloriesIntakeInfo from "../components/shared/CaloriesIntakeInfo"
import WeeklyChart from "../components/dashboard/WeeklyChart"

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
    <Layout>
      <GeneralInfoSection user={ user } />
      <CaloriesIntakeInfo day="today" />
      <WeeklyChart />
    </Layout>
  )
}

export default Dashboard