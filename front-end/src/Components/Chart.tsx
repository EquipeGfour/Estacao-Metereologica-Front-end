import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function Chart(nome:any, dados:any, parametroNome:any, params: any ) {
    var param2: any[] = []
    params.map((param: any)=>{
        const parametros = {
            name: param.parametroNome,
            data: param.dados.dados
        }
        param2.push(parametros)
    })


    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: nome.nome
        },
        series: [param2]
    }

    return(
        <HighchartsReact highcharts={Highcharts} options={options}/>
    )
}

export default Chart