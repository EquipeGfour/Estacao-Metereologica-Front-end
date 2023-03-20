import * as S from "./styles";
import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";

function NavbarAdmin () {
    const start = <img alt="logo" src="https://tecsus.com.br/wp-content/uploads/2020/10/logo_tecsus_horizontal.png" height="40" className="tecsus"></img>;
    const items: MenuItem[] = [
        { 
            label: 'Home',
            icon: 'pi pi-fw pi-home'
        },
        {
            label: 'Listagem de Estações',
            icon: 'pi pi-fw pi-list',
        },
        {
            label: 'Adicionar Estação',
            icon: 'pi pi-fw pi-plus',
        }
    ]
    const end = <Button icon={'pi pi-fw pi-sign-out'}/>
    return(
        <>
            <S.NavBarAdmin>
                <Menubar model={items} start={start} end={end}/>
            </S.NavBarAdmin>
        </>
    )
}
export default NavbarAdmin