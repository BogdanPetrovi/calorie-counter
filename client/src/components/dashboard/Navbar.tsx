import type { Dispatch, SetStateAction } from "react"
import type React from "react"
import { BsPlusCircle } from "react-icons/bs"
import { IoMenu } from "react-icons/io5"

interface NavbarProps {
  isSidebar: boolean,
  setSidebar: Dispatch<SetStateAction<boolean>>
}

const Navbar:React.FC<NavbarProps> = ({ isSidebar, setSidebar }) => {
  return (
    <div className="fixed top-0 left-0 z-40 w-screen h-16 border-b-2 bg-zinc-50 border-zinc-400/10 drop-shadow-lg/10">
      <div className="w-full h-full flex justify-between items-center px-5 xl:px-10">
        <div className="flex items-center gap-2">
          <IoMenu className="size-11 xl:hidden" onClick={() => setSidebar(!isSidebar)} />
          <h1 className="hidden md:block text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-green-500 to-green-700">
            Calorie counter
          </h1>
        </div>
          <BsPlusCircle className="xl:hidden text-green-700 size-11 rounded-full cursor-pointer hover:bg-zinc-200 duration-300" />
        <button className="hidden xl:block w-50 h-2/3 bg-green-700 hover:bg-green-600 text-2xl text-white font-semibold cursor-pointer rounded-xl duration-300">
          Add meal
        </button>
      </div>
    </div>
  )
}

export default Navbar