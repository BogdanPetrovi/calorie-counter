import axios from "axios"
import Loader from "../components/general/Loader"
import { useUser } from "../utils/useQuery/userQuery"
import { Navigate } from "react-router-dom"
import Layout from "../components/shared/layout/Layout"
import UserStats from "../components/history/UserStats"
import CaloriesIntakeInfo from "../components/shared/CaloriesIntakeInfo"
import MealHistoryOverview from "../components/history/MealHistoryOverview"

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
      <UserStats />
      <CaloriesIntakeInfo day="yesterday" />
      <MealHistoryOverview />
    </Layout>
  )
}

export default History