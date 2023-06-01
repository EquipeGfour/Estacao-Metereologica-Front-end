import React, { useState, useEffect, useRef } from 'react';
import * as S from "./styles";
import { InputText } from "primereact/inputtext";
import NavbarAdmin from '../../../Components/NavbarAdmin';
import { Button } from 'primereact/button';
import { api } from '../../../service/api';
import 'primeflex/primeflex.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Estacao {
    id: number;
    nome: string;
    data_criacao: Date;
    latitude: string;
    longitude: string;
    utc: Date;
}

function ListagemEstacao() {

    const dt = useRef<DataTable<Estacao[]>>(null);
    const [estacoes, setEstacao] = useState<Estacao[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const navigate = useNavigate();

    async function getAllEstacoes() {
        const response = await api.get<Estacao[]>("/estacao/buscar");
        setEstacao(response.data);
    }

    useEffect(() => {
        getAllEstacoes();
    }, []);

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" placeholder="Pesquisar" onInput={(e) => {const target = e.target as HTMLInputElement; setGlobalFilter(target.value);}}/>
            </span>
        </div>
    );

    const actionBodyTemplate = (estacao: Estacao) => {
        return (
            <React.Fragment>
                <Button label='Ver mais' onClick={e => navigate(`/visualizacao-estacao/${estacao.id}`)} />
            </React.Fragment>
        );
    };

    return (
        <>
            <S.ListagemEstacao>
                <section>
                    <header>
                        <NavbarAdmin />
                    </header>
                    <main>
                        <h1>Estações</h1>
                        <div className='conteudo'>
                            <DataTable ref={dt} value={estacoes} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} globalFilter={globalFilter} header={header}>
                                <Column field="nome" header="Name" style={{ minWidth: '20rem' }} ></Column>
                                <Column field="latitude" header="Latitude" style={{ minWidth: '20rem' }}></Column>
                                <Column field="longitude" header="Longitude" style={{ minWidth: '20rem' }}></Column>
                                <Column body={actionBodyTemplate} style={{ minWidth: '14rem' }}></Column>
                            </DataTable>
                        </div>
                    </main>
                </section>
            </S.ListagemEstacao>
        </>
    )
}

export default ListagemEstacao;