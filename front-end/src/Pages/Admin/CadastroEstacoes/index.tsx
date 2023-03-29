import React, { useState,useEffect,useCallback } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import * as S from "./styles";
import { Button } from 'primereact/button';
import NavbarAdmin from '../../../Components/NavbarAdmin';
import axios from 'axios';
import { api } from "../../../service/api";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";



interface CadastroEstaçoes{
    nome:String,
    data_criacao:String,
    latitude:String,
    longitude:String,
    utc:String
}


function CadastroEstacao() {
    const cadastrarEstacao = useCallback(async (data: CadastroEstaçoes) => {
        await api
            .post<CadastroEstaçoes>(`/estacao/cadastrar`, {
                nome:data.nome,
                data_criacao:"2023-03-16T17:30:00.000Z",
                latitude:data.latitude,
                longitude:data.longitude,
                utc:'2023-03-16T17:30:00.000Z'

            })
            .then((response) => {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error)
            });
    }, []);
    
    const onSubmit = useCallback(async (data: CadastroEstaçoes) => {
        cadastrarEstacao(data);
        navigate(-1)
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroEstaçoes>({
        mode: "onBlur",
    });

    const navigate = useNavigate();
    const [value, setValue] = useState<string>();
    const [valuess, setValuess] = useState<string>();
    const [values, setValues] = useState<string>();
    
    return (
        <S.Container>
            <section>
                <header>
                    <NavbarAdmin/>
                </header>
                <main>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card">
                        <div className="campos">
                            <p>Cadastrar Estação</p>
                            <div className="estacaoNome">
                                <label htmlFor="username">Nome da estação</label>
                                <InputText className="inputNome" type="text" placeholder="Estação X"  value={value} {...register("nome")}  required/>
                            </div>
                            <br />
                            <div className="localizacao">
                                <label htmlFor="localization">Localização</label>
                                <InputText type="text" placeholder="Latitude" value={values} {...register("latitude")}   required/>
                                <InputText type="text" placeholder="Longitude" value={valuess}  {...register("longitude")} required/>
                            </div>
                            <div className="botao">
                                <Button label="Cadastrar" type="submit" className="p-button-outlined" onSubmit={() => navigate(-1)} />
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
