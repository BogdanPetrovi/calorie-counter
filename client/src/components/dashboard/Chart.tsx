import { CategoryScale, Chart as ChartJS, defaults, Legend, LinearScale, LineElement, PointElement, Tooltip, type ChartOptions } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { Line } from 'react-chartjs-2'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, annotationPlugin, Legend)
defaults.maintainAspectRatio = false
defaults.color = 'green';

const Chart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories',
        data: [2100, 3000, 2410, 2401, 2913, 2503, 2503],
        borderColor: 'green',
        backgroundColor: 'green'
      }
    ]
  }

  const options: ChartOptions<'line'> = {
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
      data={data}
      options={options}
    />
  )
}

export default Chart