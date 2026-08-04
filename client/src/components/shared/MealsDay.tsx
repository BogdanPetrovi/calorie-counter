import MealBar from "./ui/MealBar"
import { useRecentMeals } from "../../utils/api/hooks/recentMealsQuery"
import Title from "../shared/ui/Title"
import ContainerDiv from "../shared/ui/ContainerDiv"
import EmptyState from "./ui/EmptyState"
import { LuUtensilsCrossed } from "react-icons/lu"
import emptyStateDescriptions from "../../utils/emptyStateDescriptionsForDaysContainer"
import AddMealModal from "./AddMealModal"
import { useState } from "react"

const MealsDay = ({ day }: { day: 'today' | 'yesterday' }) => {
  const { data, isPending } = useRecentMeals()
  const [isAddMealModal, setIsAddMealModal] = useState(false)
  const recentMeals = day === 'today' ? data?.today : data?.yesterday
  
  if(isPending || !data || !recentMeals) return <></>

  const totalKcal = recentMeals.reduce((sum, val) => sum + val.calories, 0)

  if(totalKcal === 0)
    return (
      <>
        <ContainerDiv>
          <Title name={`Meals ${day}`} />
          <EmptyState
            Icon={LuUtensilsCrossed}
            title={`No meal added ${day}`}
            description={ emptyStateDescriptions[day] }
            buttonText={ day === 'today' ? "Add meal" : "" }
            buttonAction={() => setIsAddMealModal(true)}
          />
        </ContainerDiv>
        {
          isAddMealModal &&
            <AddMealModal close={() => setIsAddMealModal(false)} />
        }
      </>
    )

  return (
    <ContainerDiv>
      <Title name={`Meals ${day}`} />
      <div className="w-full flex flex-col gap-4">
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
        <h2 className="text-center font-semibold text-3xl tracking-wide">
          Total:&nbsp;
          <span className="font-bold">
            { totalKcal }kcal
          </span>
        </h2>
      </div>
    </ContainerDiv>
  )
}

export default MealsDay