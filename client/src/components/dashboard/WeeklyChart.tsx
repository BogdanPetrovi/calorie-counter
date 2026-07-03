import Chart from "./Chart"
import Title from "../shared/ui/Title"

const WeeklyChart = () => {
  return (
    <div className="w-full lg:w-4/7 h-[26rem] lg:h-[31rem] bg-white shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl p-3">
      <Title name="Weekly stats" />
      <div className="h-11/12 mt-1">
        <Chart />
      </div>
    </div>
  )
}

export default WeeklyChart