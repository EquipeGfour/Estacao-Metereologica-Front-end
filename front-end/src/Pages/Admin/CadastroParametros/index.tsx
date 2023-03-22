import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import * as S from "./styles";
import { Button } from 'primereact/button';
import NavbarAdmin from '../../../Components/NavbarAdmin';


/* interface Paramns {
    name: string;
    unidade: string;
} */

function CadastroEstacao() {
    const [value, setValue] = useState<string>('');
    const [valuee, setValuee] = useState<string>('');
    const [valuess, setValuess] = useState<string>('');
    const [values, setValues] = useState<string>('');
/*     const [selectedParameters, setSelectedParameters] = useState<Paramns | null>(null);

    const Parametros: Paramns[] = [
        { name: 'Mililitro', unidade: 'ml' },
        { name: 'Velocidade', unidade: 'Km/h' },
        { name: 'Porcentagem', unidade: '%' },
    ]; */

    return (
        <S.Container>
            <section>
                <header>
                    <NavbarAdmin/>
                </header>
                <main>
                    <div className="card">
                        <div className="campos">
                            <p>Cadastrar Parâmetros</p>
                            <div className="parametroNome">
                                <label htmlFor="username">Nome</label>
                                <InputText className="inputNome" type="text" placeholder="Ex.: Temperatura" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                            </div>
                            <div className="localizacao">
                                <label htmlFor="localization">Medida</label>
                                <InputText type="text" placeholder="" value={valuee} onChange=
                                {(e: React.ChangeEvent<HTMLInputElement>) => setValuee(e.target.value)} />
                            </div>
                            <div className="localizacao">
                                <label htmlFor="localization">Fator de conversão</label>
                                <InputText type="text" placeholder="" value={values} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues(e.target.value)} />
                            </div>
                            <div className="localizacao">
                                <label htmlFor="localization">Offset</label>
                                <InputText type="text" placeholder="" value={valuess} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValuess(e.target.value)} />
                            </div>                            
                            <div className="botao">
                                <Button label="Cadastrar" type="submit" className="p-button-outlined" />
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </S.Container>
    )
}
export default CadastroEstacao;
