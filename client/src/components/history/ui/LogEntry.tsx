import { useCallback, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import AddMealModal from "../../shared/AddMealModal";
import type MealLog from "../../../types/mealLogTypes";
import apiConnection from "../../../services/apiConnection";
import { useInvalidateData } from "../../../utils/refetch";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";

const LogEntry = ({ id, calories, createdAt, foodName, mealType, servingSize }: MealLog) => {
  const { invalidateAll } = useInvalidateData()
  const [showModal, setShowModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { showToast } = useToast()
  const { showConfirm, closeConfirm } = useConfirm();

  const deleteRow = useCallback(async () => {
    setIsDeleting(true)
    try {
      await apiConnection.delete(`/dashboard/delete-meal/${id}`)
      showToast("Successfully deleted meal!", 'success')
      invalidateAll()
    } catch (err) {
      console.log(err)
      showToast("Couldn't delete your meal, try again!", 'error')
    } finally {
      setIsDeleting(false)
      closeConfirm()
    }
  }, [id, invalidateAll, showToast, closeConfirm])

  const handleClick = useCallback(() => {
    showConfirm({
      title: 'Are you sure you want to delete this row?',
      description: `Your ${mealType} (${foodName}) will be permanently deleted.`,
      buttonColor: 'red',
      action: deleteRow,
      close: () => {}
    })
  }, [showConfirm, deleteRow, mealType, foodName])

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
          <button aria-label="Edit meal" onClick={() => setShowModal(true)}>
            <FaPen className="text-xl cursor-pointer -mr-3" />
          </button>
          <button aria-label="Delete meal" onClick={handleClick} disabled={isDeleting}>
            <FaTrash className={`${isDeleting && 'opacity-50 cursor-not-allowed'} text-red-700 cursor-pointer`} />
          </button>
        </div>
      </div>
      {
        showModal &&
          <AddMealModal
            close={() => setShowModal(false)} 
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