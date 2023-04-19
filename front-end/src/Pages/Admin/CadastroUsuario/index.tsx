import React, { useState, useEffect, useCallback, SetStateAction, useRef } from "react";
import { InputText } from "primereact/inputtext";
import * as S from "./styles";
import { Button } from 'primereact/button';
import axios from 'axios';
import { api } from "../../../service/api";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";



interface Cadastro {
    id: SetStateAction<number | undefined>;
    nome: String,
    email: String;
    senha: String,
    confirm_senha: String,
}

function Cadastro() {
    const [id, setId] = useState<number>();
    const [value, setValue] = useState<string>();
    const [valuee, setValuee] = useState<string>();
    const [values, setValues] = useState<string>();
    const navigate = useNavigate();


    return (

        <S.Container>
            <section>
                <header>
                </header>
                <main>
                    <form>
                        <div className="card">
                            <div className="campos">
                                <p>Cadastrar-se</p>
                                <div className="estacaoNome">
                                    <label htmlFor="username">Nome</label>
                                    <InputText className="inputNome" type="text" value={valuee} required />
                                </div>
                                <div className="estacaoNome">
                                    <label htmlFor="username">E-mail</label>
                                    <InputText className="inputNome" type="text" value={value} required />
                                </div>
                                <div className="localizacao">
                                    <label htmlFor="localization">Senha</label>
                                    <InputText type="text" placeholder="" value={values} required />
                                </div>                               
                                <div className="localizacao">
                                    <label htmlFor="localization">Confirmação de Senha</label>
                                    <InputText type="text" placeholder="" value={values} required />
                                </div>
                                <div className="botao">
                                    <Button label="Cadastrar-se" type="submit" className="p-button-outlined" />
                                </div>
                                <div className="linha"></div>
                                <div className="criar-conta">
                                    <small>Já possui uma conta ? Entrar</small>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </section>
        </S.Container>
    )
}
export default Cadastro;