import * as S from "./styles";
import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import 'primeicons/primeicons.css';

function Navbar () {
    const items: MenuItem[] = [{ 
        label: 'Home',
        icon: 'pi pi-fw pi-home'
    }]
    return(
        <>
            <S.NavBar>
                    <Menubar model={items}/>
            </S.NavBar>
        </>
    )
}

export default Navbar