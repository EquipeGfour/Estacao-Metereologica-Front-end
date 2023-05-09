import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function Chart(nome:any, dados:any) {

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: nome.nome
        },
        series: [{
            name: 'Graus',
            data: dados.dados
        },{
            name: 'vento',
            data: dados.dados
        }]
    }

    return(
        <HighchartsReact highcharts={Highcharts} options={options}/>
    )
}

export default Chart