import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import AddMealModal from "../../shared/AddMealModal";
import type MealLog from "../../../types/mealLogTypes";
import { useConfirm } from "../../../context/ConfirmContext";
import useDeleteLogEntry from "../../../utils/api/mutations/useDeleteLogEntry";

const LogEntry = ({ id, calories, createdAt, foodName, mealType, servingSize }: MealLog) => {
  const [showModal, setShowModal] = useState(false)
  const { showConfirm, closeConfirm } = useConfirm();

  const { mutate, isPending: isMutatePending } = useDeleteLogEntry()

  const handleClick = () => {
    showConfirm({
      title: 'Are you sure you want to delete this row?',
      description: `Your ${mealType} (${foodName}) will be permanently deleted.`,
      buttonColor: 'red',
      action: () => {
        closeConfirm()
        mutate(id)
      },
      close: () => {}
    })
  }

  return (
    <>
      <div className={`${isMutatePending && 'opacity-50 cursor-not-allowed'} w-full h-16 bg-black/5 rounded-lg flex items-center justify-between px-2`}>
        <h3 className="text-lg lg:text-xl font-bold tracking-wide pr-2">
          { foodName }
          <span className="font-normal text-xs lg:text-sm text-muted/60 pl-1">
            { servingSize }  
          </span>
        </h3>
        <div className="flex gap-5 items-center text-xl">
          <div className="hidden 2xl:block text-right">
            <h3 className="font-bold text-base">{ calories } kcal</h3>
            <h3 className="text-sm">{ String(createdAt) }</h3>
          </div>
          <button aria-label="Edit meal" onClick={() => setShowModal(true)}>
            <FaPen className="text-xl cursor-pointer -mr-3" />
          </button>
          <button aria-label="Delete meal" onClick={handleClick} disabled={isMutatePending}>
            <FaTrash className={'text-red-700 cursor-pointer'} />
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