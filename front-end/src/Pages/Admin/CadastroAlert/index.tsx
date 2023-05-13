import React, { useCallback, useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import * as S from "./styles";
import { Button } from 'primereact/button';
import NavbarAdmin from '../../../Components/NavbarAdmin';
import { api } from "../../../service/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";


interface CadastroAlert {
    nome: string;
    mensagem: string;
    tipo: string;
    valor:string;
};


function CadastroAlertas() {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const cadastroAlerta = useCallback(async (data: CadastroAlert) => {
        await api
            .post<CadastroAlert>(`/alerta/cadastrar`, {
                nome: data.nome,
                mensagem: data.mensagem,
                tipo:data.tipo,
                valor:data.valor
            })
            .then(function (response) {
                console.log(response);
                toast.current?.show({ severity: 'success', summary: 'Successo', detail: 'Alerta cadastrado!!', life: 3000 });
            })
            .catch(function (error) {
                console.log(error)
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
            });
    }, []);

    const onSubmit = useCallback(async (data: CadastroAlert) => {
        cadastroAlerta(data);
        navigate("/listagem-alertas")
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroAlert>({
        mode: "onBlur",
    });

    return (
        <>
            <S.Container>
                <Toast ref={toast} />
                <section>
                    <header>
                        <NavbarAdmin />
                    </header>
                    <main>
                        <div className="card">
                            <div className="campos">
                                <p>Cadastrar Alertas</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="parametroNome">
                                        <label htmlFor="username">Nome</label>
                                        <InputText className="inputNome" type="text" placeholder="Ex.: Temperatura Max" {...register("nome")} required />
                                    </div>
                                    <div className="descricao">
                                        <label htmlFor="description">Mensagem</label>
                                        <InputTextarea rows={7} {...register("mensagem")} required />
                                    </div>
                                    <div className="localizacao">
                                        <label htmlFor="localization">Tipo</label>
                                        <InputText type="text" placeholder="Ex: acima ou abaixo" {...register("tipo")} required />
                                    </div>
                                    <div className="localizacao">
                                        <label htmlFor="localization">Valor</label>
                                        <InputText type="text" placeholder="" {...register("valor")} required />
                                    </div>
                                    <div className="botao">
                                        <Button label="Cadastrar" type="submit" onSubmit={() => navigate(`/`)} className="p-button-outlined" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </section>
            </S.Container>
        </>
    )
}
export default CadastroAlertas;
