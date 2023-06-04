    import * as S from "./visualizacao";
    import React, { useCallback, useEffect, useRef, useState } from 'react';
    import { Button } from 'primereact/button';
    import { Dialog } from 'primereact/dialog';
    import { InputText } from 'primereact/inputtext';
    import { InputNumber } from 'primereact/inputnumber'
    import NavbarAdmin from "../../../Components/NavbarAdmin";
    import { api } from "../../../service/api";
    import { useNavigate, useParams } from "react-router-dom";
    import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
    import { MultiSelect } from "primereact/multiselect";
    import { Toast } from 'primereact/toast';
    import Mapa from "../../../Components/Map";
    import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
    import Chart from "../../../Components/Chart";
    import { Accordion, AccordionTab } from 'primereact/accordion';
    import axios from 'axios';


    interface EstacaoDados {
        estacao: {
            id: number;
            nome: string;
            data_criacao: string;
            latitude: string;
            longitude: string;
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
                descricao: string
            };
        }[];
        Alerta: {
            id: number;
            nome: string;
            mensagem: string;
            tipo: string;
            valor: string
        }[];
        ehp: {
            id: number;
            id_estacao: number;
            id_parametro: number;
            id_alerta: number;
        };
        medida: {
            id: number;
            unixtime: Date;
            valor_medido: number;
            id_estacao_has_parametro: number;
            id_estacao: number;
            id_parametro: number;
            id_alerta: number;
            parametro: {
                id: number;
                tipo: string;
                unidade_medida: string;
                fator_conversao: string;
                offset: string;
            };
        }
    }
    interface Medida {
        name: string,
        data: number[],
        unidade_medida: string
    }

    interface UltimaMedida {
        tipo: string,
        valor_medido: number,
        id: number,
        unixtime: Date,
        descricao: string,
        unidade_medida: string;
    }

    function VizualizacaoEstacao() {
        const [ultimaMedidas, setUltimaMedidas] = useState<UltimaMedida[]>([])
        const [visible, setVisible] = useState<boolean>(false);
        const [visible2, setVisible2] = useState<boolean>(false);
        const [visible3, setVisible3] = useState<boolean>(false);
        const [estacao, setEstacao] = useState<EstacaoDados>();
        const [alertas, setAlertas] = useState<EstacaoDados[]>([])
        const [parametros, setParametros] = useState<EstacaoDados[]>([])
        const [parametros2, setParametros2] = useState<EstacaoDados[]>([])
        const [medidas, setMedidas] = useState<Medida[]>([])
        const [selectedParametro, setSelectedParametro] = useState<EstacaoDados | null>(null);
        const [selectedParametro2, setSelectedParametro2] = useState<EstacaoDados | null>(null);
        const [selectedAlertas, setSelectedAlertas] = useState<EstacaoDados[] | any>([]);
        const { id } = useParams();
        const navigate = useNavigate();
        const toast = useRef<Toast>(null);
        const [medida, setMedida
        ] = useState<EstacaoDados[]>([])


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
        const getAllAlertas = async () => {
            await api.get<EstacaoDados[]>(`/alerta/buscar`).then((res) => {
                setAlertas(res.data);
            }).catch((error) => {
                console.log(error);
            })
        }

        const getEstacao = async () => {
            await api.get(`/ehp/parametrosEstacao/${id}`).then((res) => {
                setEstacao(res.data);
            }).catch((error) => {
                console.log(error);
            })
        }

        const confirm2 = () => {
            confirmDialog({
                message: `Tem certeza que deseja excluir o a estação ${estacao?.estacao.nome}?`,
                header: 'Excluir estação',
                icon: 'pi pi-trash',
                acceptClassName: 'p-button-danger',
                accept() {
                    deleteEstacao(String(estacao?.estacao.id))
                },
            });
        };

        const confirm3 = (id: number) => {
            confirmDialog({
                message: `Tem certeza que deseja excluir o parâmetro da estação ${estacao?.estacao.nome}?`,
                header: 'Excluir estação',
                icon: 'pi pi-trash',
                acceptClassName: 'p-button-danger',
                accept() {
                    deleteRelacaoParametro(String(id));
                },
            });
        };

        useEffect(() => {
            getEstacao();
            getAllEstacaoMedidas();
        }, [id]);


        const getAllParametros = async () => {
            const response = await api.get<EstacaoDados[]>(`/parametro/buscar-parametro`);
            setParametros(response.data);
            setParametros2(response.data);
        }

        const getAllEstacaoMedidas = async () => {
            const response = await api.get<Medida[]>(`/medida/buscar-estacaoMedida/${id}`);
            console.log(response);
            const dados = response.data.map((medida: Medida) => {
                const valores = medida.data.reduce((acc: any, cur: any) => {
                    acc.x.push(formatDate(cur.date));
                    acc.y.push(cur.value);
                    acc.unidade_medida = cur.unidade_medida; // Incluir a propriedade unidade_medida
                    return acc;
                }, { x: [], y: [], unidade_medida: '' }); // Inicializar unidade_medida como uma string vazia
                return {
                    name: medida.name,
                    data: valores,
                } as Medida;
            });
            setMedidas(dados);
            console.log(dados);
        };


        const formatDate = (data: string) => {
            const [formated,] = new Date(data).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).split(',')
            return formated;
        }
        useEffect(() => {
            getAllParametros();
            getAllAlertas();
        }, [])

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

        const VincularAlerta = async () => {
            const data = {
                id_estacao: estacao?.estacao.id,
                id_parametros: selectedParametro2,
                id_alerta: selectedAlertas
            }
            await api.put(`/alerta/vincular`, data)
                .then((res) => {
                    console.log(res)
                    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Parametros Registrados', life: 3000 });
                    getEstacao();
                    setVisible3(false);
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

        const deleteRelacaoParametro = useCallback(async (id: string) => {
            await api
                .delete(`/ehp/excluir/${id}`)
                .then(function (response) {
                    if (response) {
                        navigate(0);
                    }
                    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Estação Deletada.', life: 3000 });
                })
                .catch((err) => {
                    console.log(err);
                    toast.current?.show({ severity: 'error', summary: 'error', detail: 'Algo deu errado...', life: 3000 });
                });
        }, []);



        const buscarUltimaMedida = async () => {
            api.get(`/medida/buscar-ultimos-registros/${id}`).then(
                response => {
                    setUltimaMedidas(response.data)
                }
            )
        }

        useEffect(() => {
            buscarUltimaMedida();
        }, [])

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
                                <h1>#{estacao?.estacao.id}</h1>
                            </div>
                            <div className='container'>
                                <div className="map">
                                    <Mapa latitude={parseFloat(estacao?.estacao.latitude || "0")} longitude={parseFloat(estacao?.estacao.longitude || "0")} />
                                </div>
                                <div className="card flex justify-content-center">
                                    <div className='botaoEditar'>
                                        <Button icon="pi pi-pencil" onClick={() => setVisible(true)} label="Editar Estação" />
                                        <Button icon="pi pi-plus" onClick={() => setVisible2(true)} label="Adicionar Parâmetros" />
                                        <Button icon="pi pi-exclamation-triangle" onClick={() => setVisible3(true)} label="Vincular Alerta" />
                                        <Button onClick={confirm2} icon="pi pi-trash" label="Excluir Estação" />
                                        <h2>Localização:</h2>
                                        <h3>Latitude: {estacao?.estacao.latitude}</h3>
                                        <h3>Longitude: {estacao?.estacao.longitude}</h3>
                                        <ConfirmDialog />
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
                                    {/* alerta */}
                                    <Dialog header="Adicionar Alerta" visible={visible3} style={{ width: '50vw' }} onHide={() => setVisible3(false)}>
                                        <br />
                                        <div className="card flex justify-content-center">
                                            <InputNumber value={estacao?.estacao.id}
                                                placeholder="ID da Estação" disabled className="w-full md:w-100rem" />
                                        </div>
                                        <br />
                                        <div className="card flex justify-content-center">
                                            <MultiSelect value={selectedParametro2} onChange={(e) => setSelectedParametro2(e.value)} options={parametros2} optionLabel="tipo"
                                                filter placeholder="ID do Parametro" maxSelectedLabels={1} className="w-full md:w-100rem" optionValue="id" />
                                        </div>
                                        <br />
                                        <div className="card flex justify-content-center">
                                            <MultiSelect value={selectedAlertas} onChange={(e) => setSelectedAlertas(e.value)} options={alertas} optionLabel="nome"
                                                filter placeholder="ID do Alerta" maxSelectedLabels={1} className="w-full md:w-100rem" optionValue="id" />
                                        </div>
                                        <Button label="Vincular Alerta" style={{ marginLeft: '69%', marginTop: '25px' }} icon="pi pi-check" onClick={() => VincularAlerta()} autoFocus type="submit" />
                                    </Dialog>
                                </div>
                            </div>
                            <p className="h2"><strong>Parâmetros:</strong></p>
                            {estacao?.dados ? (
                                <div>
                                    {ultimaMedidas.map((item) => (
                                        <Accordion key={item.id} multiple activeIndex={[1]}>
                                            <AccordionTab header={
                                                <div className="flex align-items-center">
                                                    <span className="vertical-align-middle">{item.tipo}</span>
                                                    <div className="ml-auto">
                                                        <Button onClick={() => confirm3(item.id)} icon="pi pi-trash" rounded text severity="danger" aria-label="Excluir" />
                                                    </div>
                                                </div>
                                            }  >
                                                <div className="parametrosview">
                                                    <i className="pi pi-info-circle" style={{ fontSize: '1.4rem' }}></i>
                                                    <p>
                                                        <b>Ultima medição:</b> {item.valor_medido} {item.unidade_medida}
                                                        <br />
                                                        <b>Data da medição:</b> {new Date(item.unixtime).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
                                                        <br />
                                                        <b>Descrição:</b>  {item.descricao}
                                                    </p>
                                                </div>
                                            </AccordionTab>
                                        </Accordion>
                                    ))}
                                </div>
                            ) : (
                                <p>Nenhum dado encontrado.</p>
                            )}

                            {medidas.map((medida, index) => (
                                <div className="grafico" key={index}>
                                    <Chart props={{ name: medida.name, data: medida.data, tipo: medida.unidade_medida }} />
                                </div>
                            ))}

                        </div>
                    </div>
                </S.View>
            </>
        )
    }

    export default VizualizacaoEstacao;