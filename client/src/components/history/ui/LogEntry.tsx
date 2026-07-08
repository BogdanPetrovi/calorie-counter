import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import AddMealModal from "../../shared/layout/modal/AddMealModal";
import type { ToastWithShow } from "../../../types/toastTypes";
import Toast from "../../shared/Toast";
import type MealLog from "../../../types/mealLogTypes";

const LogEntry = ({ id, calories, createdAt, foodName, mealType, servingSize, servingMeasurment }: MealLog) => {
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState<ToastWithShow>({
    message: '',
    type: 'success',
    show: false
  })
  const toastSettings = ( toast: ToastWithShow ) => {
    setToast({
      ...toast,
      message: toast.message,
      show: toast.show,
      type: toast.type
    })
  }
  return (
    <>
      <div className="w-full h-16 bg-black/5 rounded-lg flex items-center justify-between px-2">
        <h3 className="text-xl lg:text-2xl font-bold tracking-wide">
          { foodName }
          <span className="font-normal text-sm lg:text-base text-black/50 pl-1">
            { servingSize }  
          </span>
        </h3>
        <div className="flex gap-5 items-center text-xl lg:text-2xl">
          <div>
            <h3 className="font-bold tracking-wide">{ calories } kcal</h3>
            <h3 className="text-sm">{ String(createdAt) }</h3>
          </div>
          <FaPen className="text-xl cursor-pointer -mr-3" onClick={() => setShowModal(true)} />
          <FaTrash className="text-red-700 cursor-pointer" />
        </div>
      </div>
      {
        showModal &&
          <AddMealModal
            close={() => setShowModal(false)} 
            toast={toastSettings}
            modalValues={{
              id,
              mealType,
              foodName,
              calories: String(calories),
              servingSize,
              servingMeasurment
            }}
          />
      }
      {
        toast.show &&
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({...toast, show: false})}
          />
      }
    </>
  )
}

export default LogEntry