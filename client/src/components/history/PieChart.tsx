import { ArcElement, Chart as ChartJS, defaults, PieController } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(PieController, ArcElement)
defaults.maintainAspectRatio = false

const PieChart = () => {
  const chartData = {
    labels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    datasets: [
      {
        label: 'Week average for this meal',
        data: [600, 1300, 500, 500],
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