import React, { useState, useEffect } from 'react';
import { AutoComplete } from "primereact/autocomplete";
import { DataView } from 'primereact/dataview';
import Navbar from "../../../Components/Navbar";
import * as S from "./styles";

function ListagemEstacao () {

    const [estacoes, setEstacoes] = useState([]);
    const [selectedEstacoes, setSelectedEstacoes] = useState(null);
    const [filteredEstacoes, setFilteredEstacoes] = useState(null);
    
    return(
        <>
            <S.ListagemEstacao>
                <section>
                    <header>
                        <Navbar/>
                    </header>
                    <main>
                        <h1>Estações</h1>
                        <div className='pesquisa'>
                            <AutoComplete placeholder='Pesquisar'/>
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