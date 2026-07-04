import LastWeekAverage from "./LastWeekAverage"
import MealLog from "./MealLog"

const MealHistoryOverview = () => {

  return (
    <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <MealLog />
      <LastWeekAverage />
    </div>
  )
}

export default MealHistoryOverview