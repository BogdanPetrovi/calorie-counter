import type { MealType } from "../../../types/mealsDayTypes"

interface MealBarProps {
  meal: MealType,
  food?: string | undefined,
  calories?: number | undefined
}

const MealBar = ({ meal, food, calories }: MealBarProps) => {
  const color = meal === 'breakfast' ? 'indigo' : meal === 'lunch' ? 'yellow' : meal === 'dinner' ? 'green' : 'orange'
  const emoji = meal === 'breakfast' ? "🍳" : meal === 'lunch' ? "🍲" : meal === 'dinner' ? "🥪" : "🍫"
  
  return (
    <div className={`w-11/12 h-20 bg-${color}-300/30 rounded-lg flex justify-between items-center px-5`}>
      <div className="flex items-center text-2xl gap-2">
        <h2>{ emoji }</h2>
        <div>
          <h2 className="font-bold tracking-wide capitalize">{ meal }</h2>
          <h4 className="text-sm -mt-2">{ food }</h4>
        </div>
      </div>
      <div className="text-right">
        <h3 className={`text-2xl font-bold text-${color}-900`}>{ calories || 0 }</h3>
        <h3 className={`text-md text-${color}-900 text-right`}>kcal</h3>
      </div>
    </div>
  )
}

export default MealBar 