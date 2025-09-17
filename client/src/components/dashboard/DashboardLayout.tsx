import type React from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import type { CompletedUser } from "../../types/userTypes"
import { useState } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode,
  user: CompletedUser
}

const DashboardLayout:React.FC<DashboardLayoutProps> = ({ children, user }) => {
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-screen">
      <Navbar isSidebar={isSidebar} setSidebar={setIsSidebar} />
      {isSidebar && 
        <Sidebar user={user} />
      }
      <div className="max-xl:hidden">
        <Sidebar user={user} />
      </div>
      {children}
    </div>
  )
}

export default DashboardLayout