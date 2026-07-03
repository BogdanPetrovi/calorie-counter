import type { Dispatch, SetStateAction } from "react"
import type { MealType } from "../../../../types/mealTypeTypes"

interface MealTypeProps {
  value: string,
  setValue: Dispatch<SetStateAction<MealType>>
}

const MealTypeSelector = ({ value, setValue }: MealTypeProps) => {
  return (
    <div className="flex gap-2 justify-center font-semibold text-xl">
      <div 
        className={`
          ${value !== 'breakfast' ? 'bg-green-100 hover:bg-green-200 active:bg-green-300' : 'bg-green-300'}
          border border-green-600 p-2 rounded-lg cursor-pointer select-none duration-200
        `}
        onClick={() => setValue('breakfast')}
      >
        <h3>Breakfast</h3>
      </div>
      <div 
        className={`
          ${value !== 'lunch' ? 'bg-green-100 hover:bg-green-200 active:bg-green-300' : 'bg-green-300'}
          border border-green-600 p-2 rounded-lg cursor-pointer select-none duration-200
        `}
        onClick={() => setValue('lunch')}
      >
        <h3>Lunch</h3>
      </div>
      <div 
        className={`
          ${value !== 'dinner' ? 'bg-green-100 hover:bg-green-200 active:bg-green-300' : 'bg-green-300'}
          border border-green-600 p-2 rounded-lg cursor-pointer select-none duration-200
        `}
        onClick={() => setValue('dinner')}
      >
        <h3>Dinner</h3>
      </div>
      <div 
        className={`
          ${value !== 'snack' ? 'bg-green-100 hover:bg-green-200 active:bg-green-300' : 'bg-green-300'}
          border border-green-600 p-2 rounded-lg cursor-pointer select-none duration-200
        `}
        onClick={() => setValue('snack')}
      >
        <h3>Snack</h3>
      </div>
    </div>
  )
}

export default MealTypeSelector