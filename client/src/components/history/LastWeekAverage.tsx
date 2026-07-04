import ContainerDiv from "../shared/ui/ContainerDiv"
import Title from "../shared/ui/Title"
import PieChart from "./PieChart"

const LastWeekAverage = () => {
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