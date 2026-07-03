import { LuApple } from "react-icons/lu"
import Title from "../shared/ui/Title"
import { useCaloriesIntakeInfo } from "../../utils/useQuery/caloriesIntakeInfoQuery"
import { useUser } from "../../utils/useQuery/userQuery"
import ContainerDiv from "../shared/ui/ContainerDiv"

interface CaloriesDayProps {
  day: 'today' | 'yesterday'
}

const CaloriesDay = ({ day }: CaloriesDayProps) => {
  const { data, isPending } = useCaloriesIntakeInfo();
  const { data: user, isPending: userPending } = useUser();

  if(isPending || !data || !user || userPending) return <></>

  const done = data[day]
  const goal = user.targetDailyCalories

  return (
    <ContainerDiv>
      <Title name={`Calories ${day}`} />
      <div className="relative inline-block">
        <LuApple className="size-[14rem] md:size-[20rem] lg:size-[23rem]" fill="#d4d4d8" color="#d4d4d8" />
        {
          done ?
            <LuApple
              fill="green"
              color="green"
              className="absolute top-0 left-0 size-[14rem] md:size-[20rem] lg:size-[23rem]"
              style={{
                clipPath: `polygon(0 0, ${Math.round((done/goal) * 100)}% 0, ${Math.round((done/goal) * 100)}% 100%, 0 100%)`
              }}
            />
          :
            <></>
        }
      </div>
    <h2 className="text-4xl"><span className="font-bold">{ done || 0 }</span> out of <span className="font-bold">{ goal }</span></h2>
  </ContainerDiv>
  )
}

export default CaloriesDay