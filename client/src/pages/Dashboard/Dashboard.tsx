import { Navigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../../utils/useQuery/userQuery"
import Loader from "../../components/general/Loader"
import Layout from "../../components/shared/layout/Layout"
import GeneralInfoSection from "../../components/dashboard/GeneralInfoSection"
import CaloriesIntakeInfo from "../../components/dashboard/CaloriesIntakeInfo"
import WeeklyChart from "../../components/dashboard/WeeklyChart"

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
    <Layout user={user}>
      <div className="xl:ml-96 mt-14 w-full py-9 px-5 flex flex-col items-center gap-5">
        <GeneralInfoSection user={ user } />
        <CaloriesIntakeInfo />
        <WeeklyChart />
      </div>
    </Layout>
  )
}

export default Dashboard