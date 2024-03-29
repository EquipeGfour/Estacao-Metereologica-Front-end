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
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

interface Parametro {
    id: number;
    tipo: string;
    descricao: string;
    unidade_medida: string;
    fator_conversao: string;
    offset: string;
}

function ListagemParametros() {
    const toast = useRef<Toast>(null);
    const [parametros, setParametros] = useState<Parametro[] | any>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedParametros, setSelectedParametros] = useState<Parametro[] | any>([]);
    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setParametros(data as Parametro);
    }, []);
    const [globalFilter, setGlobalFilter] = useState(null);

    const accept = () => {
        deleteSelectedParametros()
    }
    const confirm2 = () => {
        confirmDialog({
            message: 'Deseja Confirmar ação?',
            header: 'Deletar Confirmação',
            icon: 'pi pi-trash',
            acceptClassName: 'p-button-danger', accept
        });
    };
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
                    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Parametro Editado!!', life: 3000 });
                    getAllParametros();
                }
            })
            .catch((err) => {
                console.log(err);
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
            });
    };

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <ConfirmDialog />
                <Button label="Excluir" icon="pi pi-trash" severity="danger"
                    onClick={confirm2}
                    disabled={!selectedParametros || !selectedParametros.length} />
            </div>
        );
    };

    const deleteSelectedParametros = () => {
        let _parametros = parametros.filter((val: any) => selectedParametros.includes(val));

        setParametros(_parametros);

        _parametros.map(async (pr: any) => {
            await api.delete(`/parametro/excluir-parametro/${pr.id}`)
                .then((res) => {
                    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Parametro Deletado!!', life: 3000 });
                    getAllParametros();
                })
                .catch((err) => {
                    toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
                    console.log(err)
                })
        })
        setSelectedParametros(null);
    };
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


    return (
        <>
            <S.ListagemParametros>
                <Toast ref={toast} />
                <section>
                    <header>
                        <NavbarAdmin />
                    </header>
                    <main>
                        <h1>Parâmetros</h1>

                        <div className='conteudo'>
                            <Toolbar  left={leftToolbarTemplate}></Toolbar>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <DataTable value={parametros} editMode="row" header={header} globalFilter={globalFilter} dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} type='submit' selection={selectedParametros} onSelectionChange={(e) => setSelectedParametros(e.value)}>
                                    <Column selectionMode="multiple" exportable={false}></Column>
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