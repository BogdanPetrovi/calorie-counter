import { CategoryScale, Chart as ChartJS, defaults, Legend, LinearScale, LineElement, PointElement, Tooltip, type ChartOptions } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { Line } from 'react-chartjs-2'
import { useWeeklyStats } from '../../utils/useQuery/weeklyStatsQuery'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, annotationPlugin, Legend)
defaults.maintainAspectRatio = false

const Chart = () => {
  const { data, isPending } = useWeeklyStats()

  if(isPending || !data) return <></>

  const chartData = {
    labels: data.map(val => val.day),
    datasets: [
      {
        label: 'Calories',
        data: data.map(val => val.calories),
        borderColor: 'green',
        backgroundColor: 'green'
      }
    ]
  }

  const chartOptions: ChartOptions<'line'> = {
    plugins: {
      tooltip: {
        enabled: true
      },
      legend: {
        labels: {
          generateLabels(chart) {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels(chart)

            original.push({
              text: 'Reccomended',
              fillStyle: 'indigo',
              strokeStyle: 'indigo',
              lineWidth: 2,
              hidden: false,
              datasetIndex: -1
            })

            return original
          }
        },
        position: 'bottom',

      },
      annotation: {
        annotations: {
          reccomendedLine: {
            type: 'line',
            yMin: 2503,
            yMax: 2503,
            borderColor: 'indigo',
            borderWidth: 3,
            borderDash: [10, 10],
          }
        }
      }
    }
  }

  return (
    <Line
      data={chartData}
      options={chartOptions}
    />
  )
}

export default Chart