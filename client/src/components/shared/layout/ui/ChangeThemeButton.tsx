import { LuMoon, LuSun } from "react-icons/lu"
import { useTheme } from "../../../../context/ThemeContext"

const ChangeThemeButton = () => {
  const { theme, toggle } = useTheme()

  if(theme === undefined) return null

  return (
    <>
      {
        theme === 'light' ?
        <button 
          className="w-4/5 h-14 flex items-center pl-4 rounded-lg gap-1 text-zinc-800 text-2xl font-semibold cursor-pointer bg-zinc-300 hover:bg-zinc-400 active:bg-zinc-500 duration-300" 
          onClick={toggle}
        >
          <LuMoon /> Dark theme
        </button>
        :
        <button 
          className="w-4/5 h-14 flex items-center pl-4 rounded-lg gap-1 text-yellow-700 text-2xl font-semibold cursor-pointer bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 duration-300" 
          onClick={toggle}
        >
          <LuSun /> Light theme
        </button>
      }
    </>
  )
}

export default ChangeThemeButton