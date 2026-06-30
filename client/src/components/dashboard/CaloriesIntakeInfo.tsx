import CaloriesDay from "./CaloriesDay"
import { useUser } from "../../utils/useQuery/userQuery"
import { useCaloriesIntakeInfo } from "../../utils/useQuery/caloriesIntakeInfoQuery"
import MealsDay from "./MealsDay"

const CaloriesIntakeInfo = () => {
  const { data, isPending } = useCaloriesIntakeInfo()
  const { data: user, isPending: isUserPending } = useUser();

  if(isPending || isUserPending) return <></>

  if(!data || !user) return <></>

  return(
    <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <CaloriesDay
        day="today"
        done={data.today}
        goal={user.targetDailyCalories}
      />
      <MealsDay
        day="today"  
      />
    </div>
  )
}

export default CaloriesIntakeInfo