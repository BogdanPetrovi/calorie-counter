import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const LogEntry = () => {
  return (
    <div className="w-full h-16 bg-black/5 rounded-lg flex items-center justify-between px-2">
      <h3 className="text-xl lg:text-2xl font-bold tracking-wide">
        Chicken
        <span className="font-normal text-sm lg:text-base text-black/50 pl-1">
          500g  
        </span>
      </h3>
      <div className="flex gap-5 items-center text-xl lg:text-2xl">
        <div>
          <h3 className="font-bold tracking-wide">300 kcal</h3>
          <h3 className="text-sm">02.07.2026. 14:30</h3>
        </div>
        <FaPen className="text-xl cursor-pointer -mr-3" />
        <FaTrash className="text-red-700 cursor-pointer" />
      </div>
    </div>
  )
}

export default LogEntry