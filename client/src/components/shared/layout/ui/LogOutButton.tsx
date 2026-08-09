import { LuLogOut } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { useConfirm } from "../../../../context/ConfirmContext"
import useLogOut from "../../../../utils/api/mutations/useLogOut"

const LogOutButton = () => {
  const { showConfirm, closeConfirm } = useConfirm()
  const navigate = useNavigate()
 
  const { mutate, isPending } = useLogOut()

  const handleClick = () => 
    showConfirm({
      title: 'Are you sure you want to log out?',
      description: "You'll need to sign in again with your email and password to access your account again.",
      buttonColor: 'red',
      action: () => {
        closeConfirm()
        mutate(undefined, {
          onSuccess: () => {
            navigate("/login")
          }
        })
      }
    })

  if(isPending)
    return (
      <div className="w-4/5 h-14 bg-red-300 dark:bg-red-500 opacity-60 rounded-lg text-2xl font-semibold animate-pulse cursor-not-allowed flex items-center pl-4">
        <h3>Loading...</h3>
      </div>
    )

  return (
    <button 
      className="w-4/5 h-14 flex items-center pl-4 rounded-lg gap-1 text-red-600 dark:text-red-800 text-2xl font-semibold cursor-pointer bg-red-100 dark:bg-red-300 hover:bg-red-200 dark:hover:bg-red-400 active:bg-red-300 dark:active:bg-red-500 duration-300" 
      onClick={handleClick}
    >
      <LuLogOut /> Log out
    </button>
  )
}

export default LogOutButton