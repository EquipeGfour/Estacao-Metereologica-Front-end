
import * as S from "./visualizacao";
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Chart } from 'primereact/chart';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber'
import Navbar from "../../../Components/Navbar";

function VizualizacaoEstacao() {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (

        <div>
            <Button label="Editar" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
            datasets: [
                {
                    label: 'Primeira Semana',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Segunda Semana',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <>
            <Navbar/>
            <S.View >
                <div className="formato">
                    <div className='view'>
                        <div className='h2'>
                            <h1>Nome Estação</h1>

                        </div>
                        <div className='container'>
                            <div className="descricao">
                                <p>Descrição:</p>
                                <p className="m-0">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                                </p>
                            </div>
                            <div className='h2'>
                                <div className='texto'>
                                    <h2>Localização:</h2>
                                    <h3>Longetude:213123123</h3>
                                    <h3>Latitude:123123123</h3>
                                </div>
                            </div>

                            <div className="card flex justify-content-center">
                                <div className='botaoEditar'><Button icon="pi pi-pencil" onClick={() => setVisible(true)} /></div>
                                <Dialog header="Editar Estação" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>

                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="Nome Estação">Nome Estação</label>
                                        <InputText id="Nome Estação" aria-describedby="Nome Estação-help" />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="Descrição">Descrição:</label>
                                        <InputText id="Descrição" aria-describedby="Descrição-help" />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="Longetude">Longetude</label>
                                        <InputText id="Longetude" aria-describedby="Longetude-help" />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="Latitude">Latitude</label>
                                        <InputText id="Latitude" aria-describedby="Latitude-help" />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="Temperatura">Temperatura</label>
                                        <InputNumber id="Temperatura" aria-describedby="Temperatura-help" />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="Umidade">Umidade</label>
                                        <InputNumber id="Umidade" aria-describedby="Umidade-help" />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="V.Vento">Veloc.Vento</label>
                                        <InputNumber id="V.Vento" aria-describedby="V.Vento-help" />
                                    </div>


                                </Dialog>
                            </div>

                        </div>
                    </div>

                    <div className="parametrosDivs">
                        <div className="ParametrosEspecificos">
                            <h3 className="nivel1">Temperatura</h3>
                            <p className="Valores">18º</p>
                        </div>
                        <div className="ParametrosEspecificos">
                            <h3 className="nivel2">Umidade</h3>
                            <p className="Valores">18%</p>
                        </div>
                        <div className="ParametrosEspecificos">
                            <h3 className="nivel3">Veloc.Vento</h3>
                            <p className="Valores">18KM</p>
                        </div>
                    </div>
                    <div className="card grafico">
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>

                </div>
            </S.View>
        </>
    )
}

export default VizualizacaoEstacao;





