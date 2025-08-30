import { Navigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../../utils/query"

const Dashboard = () => {
  const { data: user, isPending, isError, error } = useUser()

  if (isError)
    if(axios.isAxiosError(error) && error.status === 401)
      return <Navigate to={'/login'} />

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default Dashboard