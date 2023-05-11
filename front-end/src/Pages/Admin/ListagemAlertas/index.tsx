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

interface Alerta {
    id: number;
    nome: string;
    mensagem: string;
    tipo:string;
    valor:string
}
function ListagemAlertas() {
    const toast = useRef<Toast>(null);
    const [alertas, setAlertas] = useState<Alerta[] | any>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedAlertas, setSelectedAlertas] = useState<Alerta[] | any>([]);
    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setAlertas(data as Alerta);
    }, []);

    const accept = () => {
        deleteSelectedAlertas()
    }
    const confirmaExclusao = () => {
        confirmDialog({
            message: 'Deseja Confirmar ação?',
            header: 'Deletar Confirmação',
            icon: 'pi pi-trash',
            acceptClassName: 'p-button-danger', accept
        });
    }
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
                tipo:newData.tipo,
                valor:newData.valor
            })
            .then(function (response) {
                if (response) {
                    getAllAlertas();
                    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Alerta Editado!!', life: 3000 });
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
                    onClick={confirmaExclusao}
                    disabled={!selectedAlertas || !selectedAlertas.length} />
            </div>
        );
    };

    const deleteSelectedAlertas = () => {
        let _alertas = alertas.filter((val: any) => selectedAlertas.includes(val));

        setAlertas(_alertas);

        _alertas.map(async (pr: any) => {
            await api.delete(`/alerta/excluir/${pr.id}`)
                .then((res) => {
                    getAllAlertas();
                    toast.current?.show({ severity: 'success', summary: 'Successo', detail: 'Alerta Deletado!!', life: 3000 });
                })
                .catch((err) => {
                    console.log(err)
                    toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Algo deu errado...', life: 3000 });
                })
        })
        setSelectedAlertas(null);
    };

    return (
        <>
            <S.ListagemAlertas>
                <Toast ref={toast} />
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
                        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <DataTable value={alertas} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} type='submit' selection={selectedAlertas} onSelectionChange={(e) => setSelectedAlertas(e.value)}>
                                    <Column selectionMode="multiple" style={{ width: '1%' }} exportable={false}></Column>
                                    <Column field="nome" header="Nome" editor={(options) => textEditor(options)} style={{ width: '25%' }}></Column>
                                    <Column field="mensagem" header="Mensagem" editor={(options) => textEditor(options)} style={{ width: '30%' }}></Column>
                                    <Column field="tipo" header="Tipo" editor={(options) => textEditor(options)} style={{ width: '30%' }}></Column>
                                    <Column field="valor" header="valor" editor={(options) => textEditor(options)} style={{ width: '30%' }}></Column>
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