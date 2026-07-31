import { LuLogOut } from "react-icons/lu"
import api from "../../../../services/apiConnection"
import { useNavigate } from "react-router-dom"
import { queryClient } from "../../../../main"
import { useCallback } from "react"
import { useToast } from "../../../../context/ToastContext"
import { useConfirm } from "../../../../context/ConfirmContext"

const LogOutButton = () => {
  const { showToast } = useToast()
  const { showConfirm, closeConfirm } = useConfirm()
  const navigate = useNavigate()

  const handleLogOut = useCallback(async () => {
    queryClient.removeQueries({queryKey: ['user'], exact: true})

    try {
      const result = await api.post('/auth/logOut')
      if(result.status === 200){
        closeConfirm()
        navigate('/login')
        showToast("You succesfully logged out!")
      }
    } catch (err) {
      console.log(err)
      showToast("We couldn't log you out at the moment, please try again.", 'error')
    }
  }, [navigate, showToast, closeConfirm])
 
  const handleClick = useCallback(() => 
    showConfirm({
      title: 'Are you sure you want to log out?',
      description: "You'll need to sign in again with your email and password to access your account again.",
      buttonColor: 'red',
      action: handleLogOut,
      close: () => {}
    }), [showConfirm, handleLogOut])

  return (
    <button 
      className="w-4/5 h-14 flex items-center pl-4 rounded-lg gap-1 text-red-600 text-2xl font-semibold cursor-pointer bg-red-100 hover:bg-red-200 duration-300" 
      onClick={handleClick}
    >
      <LuLogOut /> Log out
    </button>
  )
}

export default LogOutButton