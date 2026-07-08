import { ArcElement, Chart as ChartJS, defaults, PieController } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import useAvgPerMeal from '../../utils/useQuery/avgPerMealQuery'

ChartJS.register(PieController, ArcElement)
defaults.maintainAspectRatio = false

const PieChart = () => {
  const { data, isPending } = useAvgPerMeal()

  if(isPending || !data) return <></>

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