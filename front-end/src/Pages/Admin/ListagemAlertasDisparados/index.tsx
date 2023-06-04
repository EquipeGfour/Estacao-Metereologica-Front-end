import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import * as S from "./styles";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from "primereact/toast";


interface AlertaDisparado {
    id: number;
    nome: string;
    mensagem: string;
    nomeEstacao: string;
}

function ListagemAlertasDisparados() {
    const toast = useRef<Toast>(null);
    const [alertasD, setAlertasD] = useState<AlertaDisparado[] | any>([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    async function getAllAlertas() {
        const response = await api.get<AlertaDisparado[]>("/registro-alerta/buscar");
        const dados = response.data.map((m: any) => {
            m.unixtime = new Date(m.unixtime).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
            return m
        })
        setAlertasD(dados);
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
        getAllAlertas();
    }, []);


    return (
        <>
            <S.ListagemAlertas>
                <Toast ref={toast} />
                <section>
                    <header>
                        <NavbarAdmin />
                    </header>
                    <main>
                        <h1>Alertas Disparados</h1>
                        <div className='conteudo'>
                            <form>
                                <DataTable header={header} globalFilter={globalFilter} value={alertasD} dataKey="id" tableStyle={{ minWidth: '50rem' }} type='submit'>
                                    <Column field="estacao.nome" header="Nome da estação" style={{ width: '25%' }}></Column>
                                    <Column field="alerta.nome" header="Nome do Alerta" style={{ width: '18%' }}></Column>
                                    <Column field="alerta.mensagem" header="Mensagem" style={{ width: '30%' }}></Column>
                                    <Column field="unixtime" header="Data e Hora de Disparo" style={{ width: '25%' }}></Column>
                                </DataTable>
                            </form>
                        </div>
                    </main>
                </section>
            </S.ListagemAlertas>
        </>
    )
}

export default ListagemAlertasDisparados;