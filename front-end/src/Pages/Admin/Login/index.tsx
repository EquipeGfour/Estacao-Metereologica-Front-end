import React, { useState, useEffect, useCallback, SetStateAction, useRef, useContext } from "react";
import { InputText } from "primereact/inputtext";
import * as S from "./styles";
import { Button } from 'primereact/button';
import axios from 'axios';
import { api } from "../../../service/api";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { sign } from "crypto";
import { SignatureKind } from "typescript";
import { useCookies } from "react-cookie";



interface UserLogin {
    email: string;
    senha: string;
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [cookie, setCookies] = useCookies();

    const login = async (event: any) => {
        event.preventDefault();
        await axios.post("http://localhost:5000/login/", {
            email: email,
            senha: password,
        }).then((res) => {
            console.log(res)
            setEmail("")
            setPassword("")
            navigate("/")
        }
        ).catch((erro) => {
            event.preventDefault();
            console.error('Erro', erro.response)
            toast.current?.show({ severity: 'error', summary: 'Erro ao fazer login', detail: 'Email ou senha inválidos' });
        })
    }

    return (

        <S.Container>
            <section>
                <header>
                </header>
                <main>
                    <form>
                        <Toast ref={toast} />
                        <div className="card">
                            <div className="campos">
                                <p>Login</p>
                                <div className="estacaoNome">
                                    <label htmlFor="username">E-mail</label>
                                    <InputText className="inputNome" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="localizacao">
                                    <label htmlFor="localization">Senha</label>
                                    <InputText type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                {/* <small id="username-help">
                                    Esqueceu sua senha ? =)
                                </small> */}
                                <div className="botao">
                                    <Button label="Login" type="submit" onClick={login} className="p-button-outlined" />
                                </div>
                                <div className="linha"></div>
                                <div className="criar-conta">
                                    <small>Ainda não possui uma conta ? <a href="/cadastro-usuario">Criar conta</a></small>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </section>
        </S.Container>
    )
}
export default Login;