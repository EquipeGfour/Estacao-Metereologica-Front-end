import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function Chart({ props }: any) {

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: props.name
        },
        xAxis: {
            type: 'datetime',
            categories:props.data?.x || [],
        },
        yAxis: {
            title: {
                text: props.name
            }
        },
        series:[{
            name: props.name,
            data:props.data?.y || []
        }]
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
}

export default Chart