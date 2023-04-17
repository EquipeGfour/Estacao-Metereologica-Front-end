import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import * as S from "./styles";
import React, { useState, useEffect } from 'react';
import { api } from '../../../service/api';

interface Parametro {
    id: number;
    tipo: string;
    descricao: string;
    unidade_medida: string;
    fator_conversao: string;
    offset: string;
}
function ListagemParametros () {

    const [parametros, setParametros] = useState<Parametro[]>([]);

    async function getAllParametros() {
        const response = await api.get<Parametro[]>("/parametro/buscar-parametro");
        setParametros(response.data);
      }

    useEffect(() => {
        getAllParametros();
    },[]);

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _parametros = [...parametros];
        let { newData, index } = e;

        _parametros[index] = newData;

        setParametros(_parametros);
    };

    const textEditor = (options:any) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
    };

    return(
        <>
            <S.ListagemEstacao>
                <section>
                    <header>
                        <NavbarAdmin/>
                    </header>
                    <main>
                        <h1>Parâmetros</h1>
                        <div className='pesquisa'>
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText placeholder="Pesquisar" className='barra'/>
                            </span>
                        </div>
                        <div className='conteudo'>
                        <DataTable value={parametros} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="tipo" header="Tipo" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                <Column field="descricao" header="Descrição" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                <Column field="unidade_medida" header="Unidade de Medida" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                <Column field="fator_conversao" header="Fator de Conversão" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                <Column field="offset" header="OffSet" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                            </DataTable>
                        </div>
                    </main>
                </section>
            </S.ListagemEstacao>
        </>
    )
}

export default ListagemParametros;