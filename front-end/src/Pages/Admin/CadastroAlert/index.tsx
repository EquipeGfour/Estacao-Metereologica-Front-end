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

/* interface CadastroAlertas {
} */


function CadastroAlerta() {
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('');

    return (
        <>
            <S.Container>
                <section>
                    <header>
                        <NavbarAdmin />
                    </header>
                    <main>
                        <div className="card">
                            <div className="campos">
                                <p>Cadastrar Alertas</p>
                                <form>
                                    <div className="parametroNome">
                                        <label htmlFor="username">Nome</label>
                                        <InputText className="inputNome" type="text" placeholder="Ex.: Temperatura Max" required />
                                    </div>
                                    <div className="descricao">
                                        <label htmlFor="description">Mensagem</label>
                                        <InputTextarea value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} rows={7} required />
                                    </div>
                                    <div className="localizacao">
                                        <label htmlFor="localization">Condição</label>
                                        <InputText type="number" placeholder="" required />
                                    </div>
                                    <div className="localizacao">
                                        <label htmlFor="localization">Duração</label>
                                        <InputText type="number" placeholder="" required />
                                    </div>
                                    <div className="botao">
                                        <Button label="Cadastrar" type="submit" onSubmit={() => navigate(-1)} className="p-button-outlined" />
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
export default CadastroAlerta;
