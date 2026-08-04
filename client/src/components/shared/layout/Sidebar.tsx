import LogOutButton from "./ui/LogOutButton";
import { RxDashboard } from "react-icons/rx";
import { GoHistory } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import SidebarButton from "./ui/SidebarButton";
import InitialsAvatar from "./ui/InitialsAvatar";
import { useUser } from "../../../utils/api/hooks/userQuery";
import ChangeThemeButton from "./ui/ChangeThemeButton";

const Sidebar = () => {
  const { data: user, isPending } = useUser();

  if(!user || isPending) return <></>

  return (
    <div 
      className="flex flex-col justify-between items-center py-6 fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 md:w-96 bg-background drop-shadow-xl drop-shadow-shadow z-50"
    >
      <div className="flex flex-col items-center w-full">
        <InitialsAvatar fullName={user.name} />
        <h3 className="text-3xl font-semibold capitalize">{ user.name }</h3>
        <div className="w-4/5 mt-10 flex flex-col gap-3">
          <SidebarButton
            Icon={RxDashboard}
            title="Dashboard"
            navigateTo="/dashboard"
          />
          <SidebarButton
            Icon={GoHistory}
            title="History"
            navigateTo="/history"
          />
          <SidebarButton
            Icon={LuUser}
            title="Profile"
            navigateTo="/profile"
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-3">
        <ChangeThemeButton />
        <LogOutButton />
      </div>
    </div>
  )
}

export default Sidebar