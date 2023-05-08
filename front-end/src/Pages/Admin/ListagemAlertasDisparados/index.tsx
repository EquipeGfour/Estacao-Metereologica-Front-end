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
    idE: string;
}

function ListagemAlertasDisparados() {
    const toast = useRef<Toast>(null);
    const [alertasD, setAlertasD] = useState<AlertaDisparado[] | any>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedAlertas, setSelectedAlertas] = useState<AlertaDisparado[] | any>([]);
    
    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setAlertasD(data as AlertaDisparado);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });


    async function getAllAlertas() {
        const response = await api.get<AlertaDisparado[]>("/alerta/buscar");
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <DataTable value={alertasD} editMode="row" dataKey="id" tableStyle={{ minWidth: '50rem' }} type='submit' selection={selectedAlertas} onSelectionChange={(e) => setSelectedAlertas(e.value)}>
                                    <Column selectionMode="multiple" style={{ width: '1%' }} exportable={false}></Column>
                                    <Column field="nome" header="Nome" style={{ width: '25%' }}></Column>
                                    <Column field="mensagem" header="Mensagem" style={{ width: '30%' }}></Column>
                                    <Column field="id-estação" header="ID da estação relacionada" style={{ width: '30%' }}></Column>
                                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
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