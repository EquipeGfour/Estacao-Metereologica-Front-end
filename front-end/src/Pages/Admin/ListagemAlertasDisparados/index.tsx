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

    async function getAllAlertas() {
        const response = await api.get<AlertaDisparado[]>("/registro-alerta/buscar");
        setAlertasD(response.data);
    }

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
                                <DataTable value={alertasD} dataKey="id" tableStyle={{ minWidth: '50rem' }} type='submit'>
                                    <Column field="alerta.nome" header="Nome" style={{ width: '18%' }}></Column>
                                    <Column field="alerta.mensagem" header="Mensagem" style={{ width: '30%' }}></Column>
                                    <Column field="estacao.nome" header="Nome da estação relacionada" style={{ width: '25%' }}></Column>
                                    <Column field="unixtime" header="Data de disparo" style={{ width: '25%' }}></Column>
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