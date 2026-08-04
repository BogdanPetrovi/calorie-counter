import { LuApple, LuUtensilsCrossed } from "react-icons/lu"
import Title from "./ui/Title"
import { useCaloriesIntakeInfo } from "../../utils/api/hooks/caloriesIntakeInfoQuery"
import { useUser } from "../../utils/api/hooks/userQuery"
import ContainerDiv from "./ui/ContainerDiv"
import EmptyState from "./ui/EmptyState"
import { useState } from "react"
import AddMealModal from "./AddMealModal"
import emptyStateDescriptions from "../../utils/emptyStateDescriptionsForDaysContainer"

interface CaloriesDayProps {
  day: 'today' | 'yesterday'
}

const CaloriesDay = ({ day }: CaloriesDayProps) => {
  const { data, isPending } = useCaloriesIntakeInfo();
  const { data: user, isPending: userPending } = useUser(); 
  const [isAddMealModal, setIsAddMealModal] = useState(false)

  if(isPending || !data || !user || userPending) return <></>

  const done = data[day]
  const goal = user.targetDailyCalories

  if(!done)
    return (
      <>
        <ContainerDiv>
          <Title name={`Calories ${day}`} />
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
      <Title name={`Calories ${day}`} />
        <div className="relative inline-block">
          <LuApple className="size-[23rem]" fill="#d4d4d8" color="#d4d4d8" />
          <LuApple
            fill="green"
            color="green"
            className="absolute top-0 left-0 size-[23rem]"
            style={{
              clipPath: `polygon(0 0, ${Math.round((done/goal) * 100)}% 0, ${Math.round((done/goal) * 100)}% 100%, 0 100%)`
            }}
          />
          <h2 className="text-4xl text-center"><span className="font-bold">{ done }</span> out of <span className="font-bold">{ goal }</span></h2>
          </div>
    </ContainerDiv>  
  )
}

export default CaloriesDay