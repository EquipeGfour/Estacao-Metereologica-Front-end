import * as S from "./styles";
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
    const navigate = useNavigate();
    const start = <img alt="logo" src="https://tecsus.com.br/wp-content/uploads/2020/10/logo_tecsus_horizontal.png" height="40" className="tecsus"></img>;
    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: (event) => {
                navigate("/");
            },
        },
        {
            label: 'Cadastrar',
            icon: 'pi pi-align-justify',
            items: [
                {
                    label: 'Estação',
                    icon: 'pi pi-fw pi-plus',
                    command: (event) => {
                        navigate("/cadastro-estacao");
                    },
                },
                {
                    label: 'Parâmetro',
                    icon: 'pi pi-fw pi-plus',
                    command: (event) => {
                        navigate("/cadastro-parametro");
                    },
                },
                {
                    label: 'Alerta',
                    icon: 'pi pi-fw pi-plus',
                    command: (event) => {
                        navigate("/cadastro-alerta");
                    },
                },
            ]
        }, 
        {
            label: 'Listagem',
            icon: 'pi pi-align-justify',
            items: [
                {
                    label: 'Estação',
                    icon: 'pi pi-fw pi-list',
                    command: (event) => {
                        navigate("/listagem-estacao");
                    },
                },
                {
                    label: 'Parâmetro',
                    icon: 'pi pi-fw pi-list',
                    command: (event) => {
                        navigate("/listagem-parametros");
                    },
                },
                {
                    label: 'Alerta',
                    icon: 'pi pi-fw pi-list',
                    command: (event) => {
                        navigate("/listagem-alertas");
                    },
                },
                {
                    label: 'Medida',
                    icon: 'pi pi-fw pi-list',
                    command: (event) => {
                        navigate("/listagem-medidas");
                    },
                },
            ]
        }
    ]
    return (
        <>
            <S.NavBarAdmin>
                <Menubar model={items} start={start} />
            </S.NavBarAdmin>
        </>
    )
}
export default NavbarAdmin