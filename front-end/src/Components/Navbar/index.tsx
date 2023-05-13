import * as S from "./styles";
import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";


function Navbar () {
    const navigate = useNavigate();
    const start = <img alt="logo" src="https://tecsus.com.br/wp-content/uploads/2020/10/logo_tecsus_horizontal.png" height="40" className="tecsus"></img>;
    const end =  <Button label="Criar conta" onClick={() => navigate(`/cadastro-usuario`)} className="p-button-outlined " />
    const items: MenuItem[] = [
        { 
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            command: (event) => {
                navigate("/");
            },
        }
    ]
    return(
        <>
            <S.NavBar>
                <Menubar model={items} start={start} end={end} />
            </S.NavBar>
        </>
    )
}
export default Navbar
