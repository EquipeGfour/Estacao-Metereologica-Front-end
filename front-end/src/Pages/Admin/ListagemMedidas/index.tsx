import React, { useState, useEffect } from 'react';
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { DataView } from 'primereact/dataview';
import * as S from "./styles"
import { InputText } from "primereact/inputtext";
import NavbarAdmin from '../../../Components/NavbarAdmin';
import { Button } from 'primereact/button';
import { api } from '../../../service/api';
import 'primeflex/primeflex.css';
import { useNavigate } from "react-router-dom";
import { Toolbar } from 'primereact/toolbar';
import { DataTable, DataTableRowEditCompleteEvent, DataTableSelection, DataTableValueArray } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { SelectButton } from 'primereact/selectbutton';
import axios from 'axios';
import { log } from 'console';


function ListagemMedidas() {
    const [ medidas, setMedidas] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);

    const buscarMedidas = async () =>{
        axios.get('http://localhost:5000/medida/buscar').then(
            response => {            
                const dados = response.data.map((m:any) => {
                    m.unixtime = new Date(m.unixtime).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
                    return m
                })
                setMedidas(dados)                
            }
        )
    }
    const setfilter = (e: any) => {
        if (e === "") {
            setGlobalFilter(null);
        } else {
            setGlobalFilter(e);
        }
    };
    const header = () => {
        return (
            <div className="table-header">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText 
                            type="search" className='aumentar'
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setfilter(e.target.value)
                            }
                            placeholder="Pesquisar..."
                        />
                    </span>
            </div>
        );
    };
    useEffect(() => {
        buscarMedidas();
    }, [])

    return (
        <>
        <S.ListagemMedidas>
            <section>
                <header>      
                    <NavbarAdmin />
                </header>
                <main>
                    <h1>Medidas</h1>
                    <div className='conteudo'>
                    <DataTable header={header} globalFilter={globalFilter} value= {medidas}  tableStyle={{ minWidth: '50rem' }}>
                        <Column field="id" header="Id"></Column>
                        <Column field= "estacao.nome" header="Nome Estação"></Column>
                        <Column field= "parametro.tipo" header="Parâmetro"></Column>
                        <Column field="unixtime" header="Data E Hora"></Column>
                        <Column field="valor_medido" header="Medida"></Column>
                    </DataTable>
                        
                    </div>
                </main>
            </section>
        </S.ListagemMedidas>
    </>
    )
}

export default ListagemMedidas;