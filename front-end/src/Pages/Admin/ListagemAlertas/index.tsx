import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import * as S from "./styles";
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface Alerta {
    id: number;
    nome: string;
    mensagem: string;
    condicao: string;
}
function ListagemAlertas() {

    const [alertas, setAlertas] = useState<Alerta[] | any>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setAlertas(data as Alerta);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });


    async function getAllAlertas() {
        const response = await api.get<Alerta[]>("/alerta/buscar");
        setAlertas(response.data);
    }

    useEffect(() => {
        getAllAlertas();
    }, []);


    const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
        let _alertas = [...alertas];
        let { newData, index } = e;

        _alertas[index] = newData;

        await api
            .put(`/alerta/editar/${newData.id}`, {
                nome: newData.nome,
                mensagem: newData.mensagem,
                condicao: newData.condicao
            })
            .then(function (response) {
                if (response) {
                    navigate(0);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
    };

    return (
        <>
            <S.ListagemAlertas>
                <section>
                    <header>
                        <NavbarAdmin />
                    </header>
                    <main>
                        <h1>Alertas</h1>
                        <div className='pesquisa'>
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText placeholder="Pesquisar" className='barra' />
                            </span>
                        </div>
                        <div className='conteudo'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <DataTable value={alertas} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} type='submit'>
                                    <Column field="nome" header="Nome" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column field="mensagem" header="Mensagem" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column field="condicao" header="Condição" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
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

export default ListagemAlertas;