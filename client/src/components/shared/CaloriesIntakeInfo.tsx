import CaloriesDay from "../dashboard/CaloriesDay"
import MealsDay from "../dashboard/MealsDay"

const CaloriesIntakeInfo = ({ day }: { day: 'today' | 'yesterday' }) => {
  return(
    <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <CaloriesDay
        day={day}
      />
      <MealsDay
        day={day} 
      />
    </div>
  )
}

export default CaloriesIntakeInfo