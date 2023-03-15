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
    const [selectedCities, setSelectedCities] = useState<Paramns | null>(null);
    const Parametros: Paramns[] = [
        { name: 'Temperatura', unidade: '°C' },
        { name: 'Umidade', unidade: '%' },
        { name: 'Vento', unidade: 'Km/h' },
    ];

    return (
        <>
            <S.Container>
                <main>
                    <div className="Login">

                    </div>
                    <div>

                    </div>
                    <InputText type="text" placeholder="Username" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                    <InputTextarea autoResize value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} rows={5} cols={30} />
                    <InputText type="text" placeholder="Localização" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                    <MultiSelect value={selectedCities} onChange={(e: MultiSelectChangeEvent) => setSelectedCities(e.value)} options={Parametros} optionLabel="name"
                        placeholder="Parametros" maxSelectedLabels={3} className="w-full md:w-20rem" />
                </main>
            </S.Container>
        </>
    )
}
export default CadastroEstacao;
