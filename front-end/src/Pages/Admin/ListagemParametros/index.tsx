import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import NavbarAdmin from "../../../Components/NavbarAdmin";
import * as S from "./styles";
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface Parametro {
    id: number;
    tipo: string;
    descricao: string;
    unidade_medida: string;
    fator_conversao: string;
    offset: string;
}

function ListagemParametros() {

    const [parametros, setParametros] = useState<Parametro[] | any>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setParametros(data as Parametro);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });


    async function getAllParametros() {
        const response = await api.get<Parametro[]>("/parametro/buscar-parametro");
        setParametros(response.data);
    }

    useEffect(() => {
        getAllParametros();
    }, []);


    const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
        let _parametros = [...parametros];
        let { newData, index } = e;

        _parametros[index] = newData;

        await api
            .put(`/parametro/atualizar-parametro/${newData.id}`, {
                tipo: newData.tipo,
                descricao: newData.descricao,
                unidade_medida: newData.unidade_medida,
                fator_conversao: newData.fator_conversao,
                offset: newData.offset
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

    return(
        <>
            <S.ListagemParametros>
                <section>
                    <header>
                        <NavbarAdmin/>
                    </header>
                    <main>
                        <h1>Parâmetros</h1>
                        <div className='pesquisa'>
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText placeholder="Pesquisar" className='barra' />
                            </span>
                        </div>
                        <div className='conteudo'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <DataTable value={parametros} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} type='submit'>
                                    <Column field="tipo" header="Tipo" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column field="descricao" header="Descrição" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column field="unidade_medida" header="Unidade de Medida" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column field="fator_conversao" header="Fator de Conversão" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column field="offset" header="OffSet" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                                </DataTable>
                            </form>
                        </div>
                    </main>
                </section>
            </S.ListagemParametros>
        </>
    )
}

export default ListagemParametros;