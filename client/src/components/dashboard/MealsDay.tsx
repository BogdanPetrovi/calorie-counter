import MealBar from "./ui/MealBar"
import { useRecentMeals } from "../../utils/useQuery/recentMealsQuery"

const MealsDay = ({ day }: { day: 'today' | 'yesterday' }) => {
  const { data, isPending } = useRecentMeals()
  const recentMeals = day === 'today' ? data?.today : data?.yesterday
  
  if(isPending || !data) return <></>

  return (
    <div className="bg-white shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl flex flex-col justify-around items-center p-3 gap-3">
      <h2 className="text-4xl font-bold tracking-wide self-start">Meals { day }</h2>
      <MealBar
        meal="breakfast"
        food={ recentMeals?.find(value => value.meal === "breakfast")?.foods }
        calories={ recentMeals?.find(value => value.meal === "breakfast")?.calories }
      />
      <MealBar
        meal="lunch"
        food={ recentMeals?.find(value => value.meal === "lunch")?.foods }
        calories={ recentMeals?.find(value => value.meal === "lunch")?.calories }
      />
      <MealBar
        meal="dinner"
        food={ recentMeals?.find(value => value.meal === "dinner")?.foods }
        calories={ recentMeals?.find(value => value.meal === "dinner")?.calories }
      />
      <MealBar
        meal="snack"
        food={ recentMeals?.find(value => value.meal === "snack")?.foods }
        calories={ recentMeals?.find(value => value.meal === "snack")?.calories }
      />
    </div>
  )
}

export default MealsDay