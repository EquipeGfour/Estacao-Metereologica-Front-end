import React, { useState, useEffect } from 'react';
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { DataView } from 'primereact/dataview';
import * as S from "./styles";
import { InputText } from "primereact/inputtext";
import NavbarAdmin from '../../../Components/NavbarAdmin';
import { Button } from 'primereact/button';
import { api } from '../../../service/api';
import 'primeflex/primeflex.css';
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    async function getAllEstacoes() {
        const response = await api.get<Estacao[]>("/estacao/buscar");
        setEstacao(response.data);
      }

    useEffect(() => {
        getAllEstacoes();
    },[]);
    
    const gridItem = (estacao: Estacao) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-6 shadow-2 border-round" src={`https://www.agsolve.com.br/imgprodutos/imagens/1006_2.jpg`} alt={estacao.nome} />
                        <div className="text-2xl font-bold">{estacao.nome}</div>
                        <Button className="font-bold h-3rem w-10rem justify-content-center" onClick={e=>navigate(`/visualizacao-estacao/${estacao.id}`)}>Ver mais</Button>
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
                            <DataView  value={estacoes} itemTemplate={gridItem} paginator rows={9}/>
                        </div>
                    </main>
                </section>
            </S.ListagemEstacao>
        </>
    )
}

export default ListagemEstacao;