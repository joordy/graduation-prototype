import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    legend: false,
    datasets: [
        {
            label: 'Mammut',
            data: [5, 2, 7, 8, 9, 4],
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
        },
        {
            label: 'Foam',
            data: [1, 3, 5, 3, 4, 1],
            fill: false,
            borderColor: 'hotpink',
        },
        {
            label: 'Aubade',
            data: [3, 6, 1, 4, 0, 1],
            fill: false,
            borderColor: '#742774',
        },
        {
            label: 'Land of ride',
            data: [3, 2, 3, 8, 3, 2],
            fill: false,
            borderColor: 'blue',
        },
    ],
}

const BarChart = ({}) => {
    return (
        <div className="w-[calc(100%-2em)]">
            <Chart type="line" data={data} />
        </div>
    )
}

export default BarChart
