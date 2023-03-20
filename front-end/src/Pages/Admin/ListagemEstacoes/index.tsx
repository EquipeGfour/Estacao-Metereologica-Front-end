import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import * as S from "./styles";
import { InputText } from "primereact/inputtext";
import NavbarAdmin from '../../../Components/NavbarAdmin';
import { Button } from 'primereact/button';

function ListagemEstacao () {

    const [estacoes, setEstacoes] = useState([]);
    const [selectedEstacoes, setSelectedEstacoes] = useState(null);
    const [filteredEstacoes, setFilteredEstacoes] = useState(null);
    
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
                            <DataView paginator rows={10}/>
                        </div>
                    </main>
                </section>
            </S.ListagemEstacao>
        </>
    )
}
export default ListagemEstacao;