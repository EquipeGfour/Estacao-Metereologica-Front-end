import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import * as S from "./styles";
import { Button } from 'primereact/button';

interface Paramns {
    name: string;
    unidade: string;
}

function CadastroEstacao() {
    const [value, setValue] = useState<string>('');
    /* const [selectedParameters, setSelectedParameters] = useState<Paramns | null>(null);
    const Parametros: Paramns[] = [
        { name: 'Temperatura', unidade: '°C' },
        { name: 'Umidade', unidade: '%' },
        { name: 'Vento', unidade: 'Km/h' },
    ]; */

    return (
        <S.Container>
            <section>
                <header>
                    {/* destinado ao cabeçalho */}
                </header>
                <main>
                    <div className="card">
                        <div className="campos">
                            <h1>Cadastrar Estação</h1>
                            <div className="estacaoNome">
                                <label htmlFor="username">Nome da estação</label>
                                <InputText className="inputNome" type="text" placeholder="Estação X" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                            </div>
                            <div className="descricao">
                                <label htmlFor="description">Descrição</label>
                                <InputTextarea value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} rows={8} />
                            </div>
                            <div className="localizacao">
                                <label htmlFor="localization">Localização</label>
                                <InputText type="text" placeholder="Localização" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                            </div>
                            {/* <div className="parametros">
                                <label htmlFor="Parameters">Parametros</label>
                                <MultiSelect value={selectedParameters} onChange={(e: MultiSelectChangeEvent) => setSelectedParameters(e.value)} options={Parametros} optionLabel="name"
                                    placeholder="Parametros" maxSelectedLabels={3} />
                            </div> */}
                        </div>
                    </div>
                </main>
            </section>
        </S.Container>
    )
}
export default CadastroEstacao;

