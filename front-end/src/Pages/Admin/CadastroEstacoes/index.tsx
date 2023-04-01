import React, { useState, useEffect, useCallback, SetStateAction, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import * as S from "./styles";
import { Button } from 'primereact/button';
import NavbarAdmin from '../../../Components/NavbarAdmin';
import axios from 'axios';
import { api } from "../../../service/api";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";



interface CadastroEstacoes {
    id: SetStateAction<number | undefined>;
    nome: String,
    data_criacao: String,
    latitude: String,
    longitude: String,
    utc: String
}

function CadastroEstacao() {


    const [id, setId] = useState<number>();
    const [value, setValue] = useState<string>();
    const [valuess, setValuess] = useState<string>();
    const [values, setValues] = useState<string>();
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();


    const cadastrarEstacao = useCallback((data: CadastroEstacoes) => {
        api.post<CadastroEstacoes>(`/estacao/cadastrar`, {
            nome: data.nome,
            data_criacao: "2023-03-16T17:30:00.000Z",
            latitude: data.latitude,
            longitude: data.longitude,
            utc: "2023-03-16T17:30:00.000Z",
        }).then(res => {
            setId(res.data.id);
            toast.current?.show({ severity: 'success', summary: 'Successo', detail: 'Algo deu errado...', life: 3000 });

        }).catch((err) => {
            console.error(err);
            toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
        });
    }, []);


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


    useEffect(() => {
        if (id) {
            navigate(`/visualizacao-estacao/${id}`);
        }
    }, [id, navigate]);


    return (

        <S.Container>
            <Toast ref={toast} />
            <section>
                <header>
                    <NavbarAdmin />
                </header>
                <main>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card">
                            <div className="campos">
                                <p>Cadastrar Estação</p>
                                <div className="estacaoNome">
                                    <label htmlFor="username">Nome da estação</label>
                                    <InputText className="inputNome" type="text" value={value} {...register("nome")} required />
                                </div>
                                <br />
                                <div className="localizacao">
                                    <label htmlFor="localization">Localização</label>
                                    <InputText type="text" placeholder="Latitude" value={values} {...register("latitude")} required />
                                    <InputText type="text" placeholder="Longitude" value={valuess}  {...register("longitude")} required />
                                </div>
                                <div className="botao">
                                    <Button label="Cadastrar" type="submit" className="p-button-outlined" />
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </section>
        </S.Container>
    )
}
export default CadastroEstacao;
