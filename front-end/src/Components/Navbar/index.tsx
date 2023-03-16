import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import 'primeicons/primeicons.css';
import * as S from "./styles"

function Navbar () {
    const start = <img alt="logo" src="https://tecsus.com.br/wp-content/uploads/2020/10/logo_tecsus_horizontal.png" height="40" className="tecsus"></img>;
    const items: MenuItem[] = [{ 
        label: 'Home',
        icon: 'pi pi-fw pi-home'
    }]
    return(
        <>
            <S.NavBar>
                <Menubar model={items} start={start} />
            </S.NavBar>
        </>
    )
}

export default Navbar