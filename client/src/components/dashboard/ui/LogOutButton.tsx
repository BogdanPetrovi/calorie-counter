import { LuLogOut } from "react-icons/lu"
import api from "../../../services/apiConnection"
import { useNavigate } from "react-router-dom"
import { queryClient } from "../../../main"

const LogOutButton = () => {
  const navigate = useNavigate()

  const handleLogOut = async () => {
    queryClient.removeQueries({queryKey: ['user'], exact: true})
    
    try {
      const result = await api.post('/auth/logOut')
      if(result.status === 200)
        navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <button className="w-4/5 h-14 flex items-center pl-4 rounded-lg gap-1 text-red-600 text-2xl font-semibold cursor-pointer bg-red-100 hover:bg-red-200 duration-300" onClick={handleLogOut}>
      <LuLogOut /> Log out
    </button>
  )
}

export default LogOutButton