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

    const buscarMedidas = async () =>{
        axios.get('http://localhost:5000/medida/buscar').then(
            response => {
            console.log(response);
            
              setMedidas(response.data)
            }
        )
    }
    
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
                    <div className='pesquisa'>
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText placeholder="Pesquisar" className='barra' />
                        </span>
                    <span className="botao">
                            <Button icon='pi pi-fw pi-filter' label='Filtrar' />
                    </span>
                    </div>
                    <div className='conteudo'>
                    
                    <DataTable value= {medidas}  tableStyle={{ minWidth: '50rem' }}>
                        <Column field="id" header="Id"></Column>
                        <Column field="unixtime" header="Unixtime"></Column>
                        <Column field="valor_medido" header="Valor_Medido"></Column>
                        <Column field= "id_parametro.tipo" header="Parametro"></Column>
                        <Column field= "id_estacao.nome" header=" Estação"></Column>
                    </DataTable>
                        
                    </div>











                </main>
            </section>
        </S.ListagemMedidas>
            
           
    </>
    )
}

export default ListagemMedidas;