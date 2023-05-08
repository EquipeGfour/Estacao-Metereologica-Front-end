import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react';

interface EstacaoDados {
    estacao: {
        nome: string;
    }
}



function Chart() {

    const [estacao] = useState<EstacaoDados>();

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: estacao?.estacao.nome
        },
        series: [{
            name: 'Graus',
            data: [35, 38, 40, 39, 37, 38, 36, 32, 27]
        },{
            name: 'vento',
            data: [3, 5, 6, 2, 8, 9, 11, 7]
        }]
    }

    return(
        <HighchartsReact highcharts={Highcharts} options={options}/>
    )
}

export default Chart