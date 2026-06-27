import type React from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import type { CompletedUser } from "../../types/userTypes"
import { useState } from "react"
import AddMealModal from "./modal/AddMealModal"

interface LayoutProps {
  children: React.ReactNode,
  user: CompletedUser
}

const Layout:React.FC<LayoutProps> = ({ children, user }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isModal, setIsModal] = useState(false)

  const close = () => {
    setIsModal(false)
  }

  return (
    <div className="flex min-h-screen w-screen">
      <Navbar isSidebar={isSidebar} setSidebar={setIsSidebar} setIsModal={setIsModal} />
      {isSidebar && 
        <Sidebar user={user} />
      }
      <div className="max-xl:hidden">
        <Sidebar user={user} />
      </div>
      {
        isModal &&
          <AddMealModal close={close} />
      }
      {children}
    </div>
  )
}

export default Layout