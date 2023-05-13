import React, { useState, useEffect, useCallback, SetStateAction, useRef } from "react";
import { InputText } from "primereact/inputtext";
import * as S from "./styles";
import { Button } from 'primereact/button';
import axios from 'axios';
import { api } from "../../../service/api";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import { Password } from 'primereact/password';


interface Cadastro {
    nome: String,
    email: String;
    senha: String,
}

function CadastroUsuarios() {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const cadastroUsuario = useCallback(async (data: Cadastro) => {
        await api
            .post<Cadastro>(`/usuarios/cadastrar`, {
                nome: data.nome,
                email: data.email,
                senha: data.senha,
            })
            .then(function (response) {
                console.log(response);
                toast.current?.show({ severity: 'success', summary: 'Successo', detail: 'Usuário cadastrado!!', life: 3000 });
            })
            .catch(function (error) {
                console.log(error)
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
            });
    }, []);

    const onSubmit = useCallback(async (data: Cadastro) => {
        cadastroUsuario(data);
        navigate("/")
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Cadastro>({
        mode: "onBlur",
    });

    return (
        <>
            <S.Container>
                <Toast ref={toast} />
                <section>
                    <main>
                        <div className="card">
                            <div className="campos">
                                <p>Cadastrar-se</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="estacaoNome">
                                        <label htmlFor="username">Nome</label>
                                        <InputText className="inputNome" type="text" {...register("nome")} required />
                                    </div>
                                    <div className="estacaoNome">
                                        <label htmlFor="username">E-mail</label>
                                        <InputText className="inputNome" type="text" {...register("email")} required />
                                    </div>
                                    <div className="localizacao">
                                        <label htmlFor="localization">Senha</label>
                                        <InputText type="password" placeholder="" {...register("senha")} required />
                                    </div>
                                    <div className="botao">
                                        <Button label="Cadastrar-se" type="submit" onSubmit={() => navigate(`/`)} className="p-button-outlined" />
                                    </div>
                                </form>
                                <br />
                                    <hr  style={{display:'flex',justifyContent:'row',width:"100%"}}/>
                                    <div className="criar-conta">
                                    <p  style={{paddingTop:14}}>Já possui uma conta ? </p>
                                    <Button label="Login" onClick={() => navigate(`/`)} className="p-button-outlined w-4" />
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            </S.Container>
        </>
    )
}
export default CadastroUsuarios;