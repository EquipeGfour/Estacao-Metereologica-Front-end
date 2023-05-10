import * as S from "./visualizacao";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber'
import NavbarAdmin from "../../../Components/NavbarAdmin";
import { api } from "../../../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { registerables } from "chart.js";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import Mapa from "../../../Components/Map";
import Chart from "../../../Components/Chart";

interface EstacaoDados {
    estacao: {
        id: number;
        nome: string;
        data_criacao: string;
        latitude: any;
        longitude: any;
        utc: string;
    };
    dados: {
        id: number;
        parametro: {
            id: number;
            tipo: string;
            unidade_medida: string;
            fator_conversao: string;
            offset: string;
        };
    }[];
}

function VizualizacaoEstacao() {

    const [visible, setVisible] = useState<boolean>(false);
    const [visible2, setVisible2] = useState<boolean>(false);
    const [estacao, setEstacao] = useState<EstacaoDados>();
    const [parametros, setParametros] = useState<EstacaoDados[]>([])
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [selectedParametro, setSelectedParametro] = useState<EstacaoDados | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);


    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        editarEstacao(data as EstacaoDados);
    }, []);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });


    const getEstacao = async () => {
        await api.get(`/ehp/parametrosEstacao/${id}`).then((res) => {
            setEstacao(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getEstacao();
    }, [id]);


    const getAllParametros = async () => {
        const response = await api.get<EstacaoDados[]>(`/parametro/buscar-parametro`);
        setParametros(response.data);
    }

    useEffect(() => {
        getAllParametros();
    }, [])

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

    const deleteEstacao = useCallback(async (id: string) => {
        await api
            .delete(`/estacao/excluir/${id}`)
            .then(function (response) {
                if (response) {
                    navigate(`/listagem-estacao`);
                }
                toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Estação Deletada.', life: 3000 });
            })
            .catch((err) => {
                console.log(err);
                toast.current?.show({ severity: 'error', summary: 'error', detail: 'Algo deu errado...', life: 3000 });
            });
    }, []);

    const postParametros = async () => {
        const data = {
            id_estacao: String(id),
            id_parametros: selectedParametro
        }
        await api.post(`/ehp/cadastrar`, data)
            .then((res) => {
                console.log(res)
                toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Parametros Registrados', life: 3000 });
                getEstacao();
                setVisible2(false);
            })
            .catch(error => {
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
                console.log(error);
            })
    };


    const editarEstacao = useCallback(async (data: EstacaoDados) => {
        await api
            .put(`/estacao/editar/${id}`, {
                nome: data.estacao.nome,
                longitude: data.estacao.longitude,
                latitude: data.estacao.latitude,
            })
            .then(function (response) {
                if (response) {
                    navigate(0);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const latitudeMap = parseFloat(estacao?.estacao.latitude);
    const longitudeMap = parseFloat(estacao?.estacao.longitude);

    console.log(latitudeMap, longitudeMap)

    return (
        <>
            <Toast ref={toast} />
            <S.View >
                <header>
                    <NavbarAdmin />
                </header>

                <div className="formato">
                    <div className='view'>
                        <div className='h2'>
                            <h1>{estacao?.estacao.nome}</h1>
                        </div>
                        <div className='container'>
                            <div className="map">
                                <Mapa latitude={latitudeMap} longitude={longitudeMap}/>
                            </div>
                            <div className='h2'>
                                <div className='texto'>
                                    <h2>Localização:</h2>
                                    <h3>{estacao?.estacao.longitude}</h3>
                                    <h3>{estacao?.estacao.latitude}</h3>
                                </div>
                            </div>

                            <div className="card flex justify-content-center">
                                <div className='botaoEditar'>
                                    <Button icon="pi pi-pencil" onClick={() => setVisible(true)} />
                                    <Button icon="pi pi-plus" onClick={() => setVisible2(true)} />
                                    <Button icon="pi pi-trash" onClick={() => deleteEstacao(String(estacao?.estacao.id))} />
                                </div>
                                <Dialog header="Editar Estação" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex flex-column gap-2">
                                            <label htmlFor="Nome Estação">Nome Estação</label>
                                            <InputText id="Nome Estação" aria-describedby="Nome Estação-help" defaultValue={estacao?.estacao.nome} required {...register("estacao.nome")} />
                                        </div>
                                        <div className="flex flex-column gap-2">
                                            <label htmlFor="Longetude">Longitude</label>
                                            <InputText id="Longetude" aria-describedby="Longetude-help" defaultValue={estacao?.estacao.longitude} required {...register("estacao.longitude")} />
                                        </div>
                                        <div className="flex flex-column gap-2">
                                            <label htmlFor="Latitude">Latitude</label>
                                            <InputText id="Latitude" aria-describedby="Latitude-help" defaultValue={estacao?.estacao.latitude} required {...register("estacao.latitude")} />
                                        </div>
                                        <Button label="Editar" icon="pi pi-check" style={{ marginLeft: '85%', marginTop: '25px' }} onClick={() => setVisible(false)} autoFocus type="submit" />
                                    </form>
                                </Dialog>
                                <Dialog header="Associar Parâmetros" visible={visible2} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
                                    <div className="card flex justify-content-center">
                                        <MultiSelect value={selectedParametro} onChange={(e) => setSelectedParametro(e.value)} options={parametros} optionLabel="tipo"
                                            filter placeholder="Pârametros Selecionados" maxSelectedLabels={3} className="w-full md:w-100rem" optionValue="id" />
                                    </div>
                                    <Button label="Adicionar Parametro" style={{ marginLeft: '69%', marginTop: '25px' }} icon="pi pi-check" onClick={() => postParametros()} autoFocus type="submit" />
                                </Dialog>
                            </div>

                        </div>
                        <p><strong>Parâmetros:</strong></p>
                        {estacao?.dados ? (
                            <div>
                                {estacao.dados.map((item) => (
                                    <li style={{ listStyle: 'none' }} key={item.id}>
                                        <p>- {item.parametro.tipo}</p>
                                    </li>
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum dado encontrado.</p>
                        )}

                        <div className="grafico">
                            <Chart nome={estacao?.estacao.nome} />
                        </div>
                    </div>


                </div>
            </S.View>
        </>
    )
}

export default VizualizacaoEstacao;