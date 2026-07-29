import { CategoryScale, Chart as ChartJS, defaults, LinearScale, LineElement, PointElement, Tooltip } from "chart.js"
import { Line } from "react-chartjs-2"
import useWeightChange from "../../../utils/useQuery/weightChangeQuery"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip)
defaults.maintainAspectRatio = false

const Chart = () => {
  const { data } = useWeightChange();

  if(!data) return

  const chartData = {
    labels: data.map(val => val.date),
    datasets: [{
      label: 'Weight(kg)',
      data: data.map(val => val.weight),
      borderColor: 'green',
      backgroundColor: 'green'
    }]
  }

  const chartOptions = {
    plugins: {
      tooltip: {
        enabled: true
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false
        },
      }
    }
  }

  return (
    <div className="h-50 mt-6">
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default Chart