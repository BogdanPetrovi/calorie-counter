import type React from "react"
import type { IconType } from "react-icons"
import { Link, useLocation } from "react-router-dom"

interface SidebarButtonProps {
  Icon: IconType,
  title: string,
  navigateTo: '/dashboard' | '/history' | '/profile'
}

const SidebarButton:React.FC<SidebarButtonProps> = ({ Icon, title, navigateTo }) => {
  const location = useLocation();
  const isActive = navigateTo === location.pathname

  const defaultStyles = 'w-full h-14 flex items-center pl-4 gap-1 rounded-lg text-2xl font-semibold cursor-pointer duration-300'
  const activeStyles = 'text-white bg-green-700'
  const notActiveStyles = 'text-green-700 bg-green-100 hover:bg-green-200 active:bg-green-400'
  return (
    <Link to={navigateTo} className={`${defaultStyles} ${isActive ? activeStyles : notActiveStyles}`}>
      <Icon /> {title}
    </Link>
  )
}

export default SidebarButton