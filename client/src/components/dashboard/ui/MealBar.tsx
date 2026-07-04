import type { MealType } from "../../../types/mealTypeTypes"

interface MealBarProps {
  meal: MealType,
  food?: string | undefined,
  calories?: number | undefined
}

const MealBar = ({ meal, food, calories }: MealBarProps) => {
  const colorMap = {
    breakfast: {
      background: "bg-indigo-300/30",
      text: "text-indigo-900"
    },
    lunch: {
      background: "bg-yellow-300/30",
      text: "text-yellow-900"
    },
    dinner: {
      background: "bg-green-300/30",
      text: "text-green-900"
    },
    snack: {
      background: "bg-orange-300/30",
      text: "text-orange-900"
    },
  }
  const emoji = meal === 'breakfast' ? "🍳" : meal === 'lunch' ? "🍲" : meal === 'dinner' ? "🥪" : "🍫"
  
  return (
    <div className={`w-full h-20 ${ colorMap[meal].background } rounded-lg flex justify-between items-center px-5`}>
      <div className="flex items-center text-2xl gap-2">
        <h2>{ emoji }</h2>
        <div>
          <h2 className="font-bold tracking-wide capitalize">{ meal }</h2>
          <h4 className="text-sm -mt-2">{ food }</h4>
        </div>
      </div>
      <div className={`text-right ${ colorMap[meal].text }`}>
        <h3 className="text-2xl font-bold">{ calories || 0 }</h3>
        <h3 className="text-md text-right">kcal</h3>
      </div>
    </div>
  )
}

export default MealBar 