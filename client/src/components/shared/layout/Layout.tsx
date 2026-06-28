import type React from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import type { CompletedUser } from "../../../types/userTypes"
import { useState } from "react"
import AddMealModal from "./modal/AddMealModal"
import type { ToastWithShow } from "../../../types/toastTypes"
import Toast from "../Toast"

interface LayoutProps {
  children: React.ReactNode,
  user: CompletedUser
}

const Layout:React.FC<LayoutProps> = ({ children, user }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isModal, setIsModal] = useState(false)
  const [toast, setToast] = useState<ToastWithShow>({
    message: '',
    type: 'success',
    show: false
  })

  const close = () => {
    setIsModal(false)
  }

  const toastSettings = ( toast: ToastWithShow ) => {
    setToast({
      ...toast,
      message: toast.message,
      show: toast.show,
      type: toast.type
    })
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
          <AddMealModal close={close} toast={toastSettings} />
      }
      {
        toast.show &&
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({...toast, show: false})}
          />
      }
      {children}
    </div>
  )
}

export default Layout