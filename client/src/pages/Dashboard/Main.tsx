import { useEffect } from "react"
import apiConnection from "../../services/apiConnection"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Main = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await apiConnection.get('/auth/getUserInfo')
        console.log(user)
      } catch (err) {
        if(axios.isAxiosError(err)){
          if(err.response?.status === 401){
            navigate('/login')
          }
        } else {
          console.error(err)
        }
      }
    }

    fetchUser()

  }, [])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Main
