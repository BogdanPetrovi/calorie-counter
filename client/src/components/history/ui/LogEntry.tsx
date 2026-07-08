import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import AddMealModal from "../../shared/layout/modal/AddMealModal";
import type MealLog from "../../../types/mealLogTypes";
import apiConnection from "../../../services/apiConnection";
import { useInvalidateData } from "../../../utils/refetch";
import type { ToastWithShow } from "../../../types/toastTypes";

const LogEntry = ({ id, calories, createdAt, foodName, mealType, servingSize, toastSettings }: MealLog & { toastSettings: (toast: ToastWithShow) => void }) => {
  const { invalidateAll } = useInvalidateData()
  const [showModal, setShowModal] = useState(false)

  const deleteRow = async () => {
    try {
      await apiConnection.delete(`/dashboard/delete-meal/${id}`)
      toastSettings({ 
        message: `Succesfuly deleted meal!`,  
        show: true,
        type: 'success'
      })
    } catch (err) {
      console.log(err)
      toastSettings({ 
        message: `Couldn't delete your meal, try again!`,  
        show: true,
        type: 'error'
      })
    }

    invalidateAll()
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
          <FaTrash className="text-red-700 cursor-pointer" onClick={() => deleteRow()} />
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
              servingSize
            }}
          />
      }
      
    </>
  )
}

export default LogEntry