import { LuLogOut } from "react-icons/lu"

const LogOutButton = () => {
  return (
    <button className="w-4/5 h-14 flex items-center pl-4 rounded-lg gap-1 text-red-600 text-2xl font-semibold cursor-pointer bg-red-100 hover:bg-red-200 duration-300">
      <LuLogOut /> Log out
    </button>
  )
}

export default LogOutButton