import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'

function Chart(props: any) {
    const [param2, setParam2] = useState<any[]>([])
    useEffect(() => {
        props.params?.map((param: any) => {
            var temp: any[] = []
            const parametro = {
                name: param.name,
                data: param.data
            }
            temp.push(parametro)
            setParam2(temp)
        })
        console.log(param2)
    }
    )

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: props.nome
        },
        series: param2
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
}

export default Chart