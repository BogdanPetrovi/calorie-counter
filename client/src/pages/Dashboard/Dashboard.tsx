import { Navigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../../utils/userQuery"
import Loader from "../../components/general/Loader"

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
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => console.log(user)}>s</button>
    </div>
  )
}

export default Dashboard