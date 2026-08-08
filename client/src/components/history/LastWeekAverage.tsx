import useAvgPerMeal from "../../utils/api/hooks/avgPerMealQuery"
import ContainerDiv from "../shared/ui/ContainerDiv"
import ContainerLoading from "../shared/ui/ContainerLoading"
import Title from "../shared/ui/Title"
import PieChart from "./PieChart"

const LastWeekAverage = () => {
  const { isPending } = useAvgPerMeal()

  if(isPending) 
    return (
      <ContainerLoading 
        title="Last week average per meal" 
        request="get" 
        containerType="all" 
      />
    )

  return (
    <ContainerDiv>
      <Title name="Last week average per meal" />
      <div className="w-full h-full">
        <PieChart />
      </div>
    </ContainerDiv>
  )
}

export default LastWeekAverage