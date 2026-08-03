import type { IconType } from "react-icons"
import { Link, useLocation } from "react-router-dom"

interface SidebarButtonProps {
  Icon: IconType,
  title: string,
  navigateTo: '/dashboard' | '/history' | '/profile'
}

const SidebarButton = ({ Icon, title, navigateTo }: SidebarButtonProps) => {
  const location = useLocation();
  const isActive = navigateTo === location.pathname

  const defaultStyles = 'w-full h-14 flex items-center pl-4 gap-1 rounded-lg text-2xl font-semibold cursor-pointer duration-300'
  const activeStyles = 'text-white bg-green-700 dark:bg-green-900'
  const notActiveStyles = 'text-green-700 dark:text-green-900 bg-green-100 dark:bg-green-400 dark:hover:bg-green-500 hover:bg-green-200 active:bg-green-400 dark:active:bg-green-600'
  return (
    <Link to={navigateTo} className={`${defaultStyles} ${isActive ? activeStyles : notActiveStyles}`}>
      <Icon /> {title}
    </Link>
  )
}

export default SidebarButton