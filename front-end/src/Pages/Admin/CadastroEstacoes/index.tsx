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



interface CadastroEstacoes {
    id: SetStateAction<number | undefined>;
    nome: String,
    data_criacao: String,
    latitude: String,
    longitude: String,
    utc: String,
    uid:string
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
}

function CadastroEstacao() {
    const [selectedParametro, setSelectedParametro] = useState<EstacaoDados[]>([]);
    const [parametros, setParametros] = useState<EstacaoDados[]>([])
    const [estacao, setEstacao] = useState<EstacaoDados>();
    const [visible2, setVisible2] = useState<boolean>(false);
    const [id, setId] = useState<number>();
    const [value, setValue] = useState<string>();
    const [valuess, setValuess] = useState<string>();
    const [values, setValues] = useState<string>();
    const toast = useRef<Toast>(null);

    const cadastrarEstacao = useCallback((data: CadastroEstacoes) => {
        api.post<CadastroEstacoes>(`/estacao/cadastrar`, {
            nome: data.nome,
            data_criacao: "2023-03-16T17:30:00.000Z",
            latitude: data.latitude,
            longitude: data.longitude,
            utc: "2023-03-16T17:30:00.000Z",
            uid:data.uid
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
    }

    useEffect(() => {
        getAllParametros();
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
                                    <Button label="Cadastrar" type="submit" className="p-button-outlined" />
                                </div>
                            </form>
                            <Button label="Adicionar Parametros" style={{ marginTop: "10px" }} onClick={() => setVisible2(true)} />
                            <Dialog header="Associar Parâmetros" visible={visible2} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
                                <div className="card flex justify-content-center">
                                    <MultiSelect value={selectedParametro} onChange={(e) => setSelectedParametro(e.value)} options={parametros} optionLabel="tipo"
                                        filter placeholder="Pârametros Selecionados" maxSelectedLabels={3} className="w-full md:w-100rem" optionValue="id" />
                                </div>
                                <Button label="Adicionar Parametro" style={{ marginLeft: '69%', marginTop: '25px' }} icon="pi pi-check" onClick={() => postParametros()} autoFocus type="submit" />
                            </Dialog>
                        </div>
                    </div>
                </main>
            </section>
        </S.Container>
    )
}
export default CadastroEstacao;
