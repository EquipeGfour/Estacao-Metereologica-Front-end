import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'

function Chart({props}:any) {

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: props.nome
        },
        series: props.series
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
}

export default Chart