import React, { useState, useEffect } from 'react';
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { DataView } from 'primereact/dataview';
import * as S from "./styles";
import { InputText } from "primereact/inputtext";
import NavbarAdmin from '../../../Components/NavbarAdmin';
import { Button } from 'primereact/button';
import { api } from '../../../service/api';

interface Estacao {
    id: number;
    nome: string;
    data_criacao: Date;
    latitude: string;
    longitude: string;
    utc: Date;
}

function ListagemEstacao () {

    const [estacoes, setEstacao] = useState<Estacao[]>([]);
    const [selectedEstacoes, setSelectedEstacoes] = useState(null);
    const [filteredEstacoes, setFilteredEstacoes] = useState(null);

    async function getAllEstacoes() {
        const response = await api.get<Estacao[]>("/estacao/buscar");
        setEstacao(response.data);
      }

    useEffect(() => {
        getAllEstacoes();
    });
    
    const itemTemplate = (estacao: Estacao) => {
        return (
            <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://www.agsolve.com.br/imgprodutos/imagens/1006_2.jpg`} alt={estacao.nome} />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{estacao.nome}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
    return(
        <>
            <S.ListagemEstacao>
                <section>
                    <header>
                        <NavbarAdmin/>
                    </header>
                    <main>
                        <h1>Estações</h1>
                        <div className='pesquisa'>
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText placeholder="Pesquisar" className='barra'/>
                            </span>
                            <span className="botao">
                                <Button icon='pi pi-fw pi-filter' label='Filtrar'/>
                            </span>
                        </div>
                        <div className='conteudo'>
                            <DataView  value={estacoes} itemTemplate={itemTemplate} paginator rows={10}/>
                        </div>
                    </main>
                </section>
            </S.ListagemEstacao>
        </>
    )
}

export default ListagemEstacao;