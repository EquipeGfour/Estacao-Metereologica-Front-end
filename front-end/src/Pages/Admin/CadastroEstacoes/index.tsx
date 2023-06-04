import React, { useState, useEffect, useCallback, SetStateAction, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import * as S from "./styles";
import { Button } from 'primereact/button';
import NavbarAdmin from '../../../Components/NavbarAdmin';
import { api } from "../../../service/api";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputNumber } from "primereact/inputnumber";




interface CadastroEstacoes {
    id: SetStateAction<number | undefined>;
    nome: String,
    data_criacao: String,
    latitude: String,
    longitude: String,
    utc: String,
    uid: string
}
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
        };
    }[];
    Alerta: {
        id: number;
        nome: string;
        mensagem: string;
        tipo:string;
        valor:string
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

function CadastroEstacao() {
    const [selectedParametro, setSelectedParametro] = useState<EstacaoDados[]>([]);
    const [selectedAlerta, setSelectedAlerta] = useState<EstacaoDados[]>([]);
    const [parametros, setParametros] = useState<EstacaoDados[]>([])
    const [alertas, setAlertas] = useState<EstacaoDados[]>([])
    const [estacao, setEstacao] = useState<EstacaoDados>();
    const [visible2, setVisible2] = useState<boolean>(false);
    const [visible3, setVisible3] = useState<boolean>(false);
    const [visible4, setVisible4] = useState<boolean>(false);
    const [id, setId] = useState<number>();
    const [value, setValue] = useState<string>();
    const [valuess, setValuess] = useState<string>();
    const [values, setValues] = useState<string>();
    const toast = useRef<Toast>(null);
    const [selectedParametro2, setSelectedParametro2] = useState<EstacaoDados | null>(null);
    const [selectedAlertas, setSelectedAlertas] = useState<EstacaoDados[] | any>([]);
    const [parametros2, setParametros2] = useState<EstacaoDados[]>([])

    const [visible, setVisible] = useState<boolean>(false);

    const accept = async () => {
        setVisible2(true);
    }

    const reject = () => {
        toast.current?.show({ severity: 'warn', detail: 'Estação cadastrada sem parametros', life: 3000 });
    }

    const accept2 = async () => {
        setVisible3(true);
    }

    const reject2 = () => {
        toast.current?.show({ severity: 'warn', detail: 'Parametro sem alerta vinculado', life: 3000 });
    }

    const cadastrarEstacao = useCallback((data: CadastroEstacoes) => {
        api.post<CadastroEstacoes>(`/estacao/cadastrar`, {
            nome: data.nome,
            data_criacao: "2023-03-16T17:30:00.000Z",
            latitude: data.latitude,
            longitude: data.longitude,
            utc: "2023-03-16T17:30:00.000Z",
            uid: data.uid
        }).then(res => {
            setId(res.data.id);
            toast.current?.show({ severity: 'success', summary: 'Successo', detail: 'Estação cadastrada!!', life: 3000 });
        }).catch((err) => {
            console.error(err);
            toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
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

    const postAlertas = async () => {
        const data = {
            id_estacao: String(id),
            id_alerta: selectedAlerta
        }
        await api.post(`/alerta/vincular`, data)
            .then((res) => {
                console.log(res)
                toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Alerta vinculado', life: 3000 });
                getEstacao();
                setVisible3(false);
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
                toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Alerta Vinculado', life: 3000 });
                getEstacao();
                setVisible3(false);
            })
            .catch(error => {
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
                console.log(error);
            })
    };

    const getEstacao = async () => {
        await api.get(`/ehp/parametrosEstacao/${id}`).then((res) => {
            setEstacao(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const getAllParametros = async () => {
        const response = await api.get<EstacaoDados[]>(`/parametro/buscar-parametro`);
        setParametros(response.data);
        setParametros2(response.data);
    }

    const getAllAlertas = async () => {
        const response = await api.get<EstacaoDados[]>(`/alerta/buscar`);
        setAlertas(response.data);
    }

    useEffect(() => {
        getAllParametros();
        getAllAlertas();
    }, [])


    const onSubmit = useCallback(
        async (data: CadastroEstacoes) => {
            await cadastrarEstacao(data);
        },
        [cadastrarEstacao]
    );


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroEstacoes>({
        mode: "onBlur",
    });



    return (

        <S.Container>
            <Toast ref={toast} />
            <section>
                <header>
                    <NavbarAdmin />
                </header>
                <main>
                    <div className="card">
                        <div className="campos">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p>Cadastrar Estação</p>
                                <div className="estacaoNome">
                                    <label htmlFor="username">Nome da estação</label>
                                    <InputText className="inputNome" type="text" value={value} {...register("nome")} required />
                                </div>
                                <div className="estacaoNome">
                                    <label htmlFor="username">Uid da estação</label>
                                    <InputText className="inputNome" type="text" value={value} {...register("uid")} required />
                                </div>
                                <div className="localizacao">
                                    <label htmlFor="localization">Localização</label>
                                    <InputText type="text" placeholder="Latitude" value={values} {...register("latitude")} required />
                                    <InputText type="text" placeholder="Longitude" value={valuess}  {...register("longitude")} required />
                                </div>
                                <div className="botao">
                                    <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Gostaria de adicionar parametros a esta estação ?"
                                        header="Adicionar parâmetros" icon="pi pi-sun" accept={accept} reject={reject} />
                                    <Button label="Cadastrar" type="submit" className="p-button-outlined" onClick={() => setVisible(true)} />
                                </div>
                            </form>
                            <Dialog header="Associar Parâmetros" visible={visible2} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
                                <div className="card flex justify-content-center">
                                    <MultiSelect value={selectedParametro} onChange={(e) => setSelectedParametro(e.value)} options={parametros} optionLabel="tipo"
                                        filter placeholder="Pârametros Selecionados" maxSelectedLabels={3} className="w-full md:w-100rem" optionValue="id" />
                                </div>
                                <Button label="Adicionar Parametro" style={{ marginLeft: '69%', marginTop: '25px' }} icon="pi pi-check" onClick={() => { postParametros(); setVisible4(true) }} autoFocus type="submit" />
                            </Dialog>
                            <div className="botao">
                                <ConfirmDialog visible={visible4} onHide={() => setVisible4(false)} message="Gostaria de vincular alertas a esta estação ?"
                                    header="Vincular alertas" icon="pi pi-sun" accept={accept2} reject={reject2} />
                            </div>
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
                </main>
            </section>
        </S.Container>
    )
}
export default CadastroEstacao;
