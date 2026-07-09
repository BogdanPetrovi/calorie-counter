import axios from "axios"
import Loader from "../components/shared/Loader"
import { useUser } from "../utils/useQuery/userQuery"
import { Navigate } from "react-router-dom"
import Layout from "../components/shared/layout/Layout"
import PersonalInfo from "../components/profile/PersonalInfo"


const Profile = () => {
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
      <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <PersonalInfo />
        {/* <ContainerDiv>
          sav info naguran 
         </ContainerDiv> */} 
        {/* bmi i clan  od */}
        {/* chart promena kilaze */}
      </div>
    </Layout>
  )
}

export default Profile