import type React from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useState } from "react"
import AddMealModal from "./modal/AddMealModal"

interface LayoutProps {
  children: React.ReactNode
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isModal, setIsModal] = useState(false)

  const close = () => {
    setIsModal(false)
  }

  return (
    <div className="flex min-h-screen w-screen">
      <Navbar isSidebar={isSidebar} setSidebar={setIsSidebar} setIsModal={setIsModal} />
      {isSidebar && 
        <Sidebar />
      }
      <div className="max-xl:hidden">
        <Sidebar />
      </div>
      {
        isModal &&
          <AddMealModal close={close} />
      }
      <div className="xl:ml-96 mt-14 w-full py-9 px-5 flex flex-col items-center gap-5 fade-in-left">
        {children}
      </div>
    </div>
  )
}

export default Layout