import Chart from "./Chart"
import Title from "../shared/ui/Title"
import { useWeeklyStats } from "../../utils/api/hooks/weeklyStatsQuery"
import ContainerLoading from "../shared/ui/ContainerLoading"

const WeeklyChart = () => {
  const { isPending } = useWeeklyStats()

  if(isPending) return (
    <ContainerLoading 
      containerType="weekly-stats"
      request="get"
      title="Weekly stats"
    />
  )

  return (
    <div className="w-full lg:w-4/7 h-[26rem] lg:h-[31rem] bg-background shadow-md shadow-shadow border border-border/50 rounded-2xl p-3">
      <Title name="Weekly stats" />
      <div className="h-11/12 mt-1">
        <Chart />
      </div>
    </div>
  )
}

export default WeeklyChart