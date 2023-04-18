import { useCallback,useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import * as S from "./styles";
import { Button } from 'primereact/button';
import NavbarAdmin from '../../../Components/NavbarAdmin';
import { api } from "../../../service/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";

interface CadastroParametros {
    tipo: string;
    unidade_medida: string;
    fator_conversao: string;
    offset: string;
    descricao: string
}
function CadastroEstacao() {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const cadastroParametros = useCallback(async (data: CadastroParametros) => {
        await api
            .post<CadastroParametros>(`/parametro/cadastrar-parametro`, {
                tipo: data.tipo,
                descricao: data.descricao,
                unidade_medida: data.unidade_medida,
                fator_conversao: data.fator_conversao,
                offset: data.offset,
            })
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            });
    }, []);

    const onSubmit = useCallback(async (data: CadastroParametros) => {
        cadastroParametros(data);
        navigate(-1)
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroParametros>({
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
                                <p>Cadastrar Parâmetros</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="parametroNome">
                                        <label htmlFor="username">Nome</label>
                                        <InputText className="inputNome" type="text" placeholder="Ex.: Temperatura" {...register("tipo")} required />
                                    </div>
                                    <div className="descricao">
                                        <label htmlFor="description">Descrição</label>
                                        <InputTextarea rows={7} {...register("descricao")} required />
                                    </div>
                                    <div className="localizacao">
                                        <label htmlFor="localization">Medida</label>
                                        <InputText type="text" placeholder="Sigla da unidade ex.: mm"{...register("unidade_medida")} required />
                                    </div>
                                    <div className="localizacao">
                                        <label htmlFor="localization">Fator de conversão</label>
                                        <InputText type="text" placeholder="" {...register("fator_conversao")} required />
                                    </div>
                                    <div className="localizacao">
                                        <label htmlFor="localization">Offset</label>
                                        <InputText type="text" placeholder="" {...register("offset")} required />
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
export default CadastroEstacao;
