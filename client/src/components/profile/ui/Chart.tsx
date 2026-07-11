import { CategoryScale, Chart as ChartJS, defaults, LinearScale, LineElement, PointElement, Tooltip } from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip)
defaults.maintainAspectRatio = false

const Chart = () => {
  const chartData = {
    labels: ['14. May', '25 May', '3 June', '15 June', '29 June', '1 July', '9 July'],
    datasets: [{
      label: 'Weight(kg)',
      data: [70, 72, 71.5, 71, 73.2, 71, 74],
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