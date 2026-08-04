import { ArcElement, Chart as ChartJS, defaults, PieController } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import useAvgPerMeal from '../../utils/api/hooks/avgPerMealQuery'
import EmptyState from '../shared/ui/EmptyState'
import { LuChartColumn } from 'react-icons/lu'
import { useState } from 'react'
import AddMealModal from '../shared/AddMealModal'

ChartJS.register(PieController, ArcElement)
defaults.maintainAspectRatio = false

const PieChart = () => {
  const { data, isPending } = useAvgPerMeal()
  const [isAddMealModal, setIsAddMealModal] = useState(false)

  if(isPending || !data) return <></>

  if(!data.breakfast && !data.lunch && !data.dinner && !data.lunch)
    return (
      <>
        <EmptyState
          Icon={LuChartColumn}
          title="No weekly averages yet"
          description="Add meals throughout the week to see your average nutrition per meal."
          buttonText='Add meal'
          buttonAction={() => setIsAddMealModal(true)}
        />
        {
          isAddMealModal &&
            <AddMealModal close={() => setIsAddMealModal(false)} />
        }
      </>
    )

  const chartData = {
    labels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    datasets: [
      {
        label: 'Week average for this meal',
        data: [data.breakfast, data.lunch, data.dinner, data.snack],
        backgroundColor: ['#818cf8', '#fde047', '#86efac', '#fdba74'],
        hoverOffset:4
      }
    ]
  }

  return (
    <Pie data={chartData} />
  )
}

export default PieChart