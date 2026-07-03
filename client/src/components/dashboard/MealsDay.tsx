import MealBar from "./ui/MealBar"
import { useRecentMeals } from "../../utils/useQuery/recentMealsQuery"
import Title from "../shared/ui/Title"
import ContainerDiv from "../shared/ui/ContainerDiv"

const MealsDay = ({ day }: { day: 'today' | 'yesterday' }) => {
  const { data, isPending } = useRecentMeals()
  const recentMeals = day === 'today' ? data?.today : data?.yesterday
  
  if(isPending || !data) return <></>

  return (
    <ContainerDiv>
      <Title name={`Meals ${day}`} />
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
    </ContainerDiv>
  )
}

export default MealsDay