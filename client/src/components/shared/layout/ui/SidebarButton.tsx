import type React from "react"
import type { IconType } from "react-icons"

interface SidebarButtonProps {
  isActive: boolean,
  Icon: IconType,
  title: string
}

const SidebarButton:React.FC<SidebarButtonProps> = ({ isActive, Icon, title }) => {
  const defaultStyles = 'w-full h-14 flex items-center pl-4 gap-1 rounded-lg text-2xl font-semibold cursor-pointer duration-300 '
  const activeStyles = 'text-white bg-green-700 hover:bg-green-800'
  const notActiveStyles = 'text-green-700 bg-green-100 hover:bg-green-200'
  return (
    <button className={`${defaultStyles} ${isActive ? activeStyles : notActiveStyles}`}>
      <Icon /> {title}
    </button>
  )
}

export default SidebarButton