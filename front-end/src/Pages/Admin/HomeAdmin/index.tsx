import NavbarAdmin from '../../../Components/NavbarAdmin';
import * as React from 'react';
import * as S from './styles';
import { api } from "../../../service/api";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

    

function Adm_Home() {

  const navigate = useNavigate();

    return (
        <>
            <S.Container>
                <header>
                    <NavbarAdmin />
                </header>
                <main>
                    <div className="welcome">
                        <h1>Bem Vindo, Administrador!</h1>
                    </div>
                    <div className="listar">
                        <div className="estacoes">
                            <h1>Estação</h1>
                            <i className="pi pi-print" style={{ fontSize: '6rem' }}></i>
                            <div className="button">
                                <Button label="Cadastrar Estação" outlined onClick={() => navigate(`/cadastro-estacao`)}/>
                                <Button label="Listagem de Estações" outlined onClick={() => navigate(`/`)}/>
                            </div>
                        </div>
                        <div className="parametros">
                            <h1>Parametro</h1>
                            <i className="pi pi-bolt" style={{ fontSize: '6rem' }}></i>
                            <div className="button">
                                <Button label="Cadastro de Parâmetros" outlined onClick={() => navigate(`/cadastro-parametro`)}/>
                                <Button label="Listagem de Parâmetros" outlined onClick={() => navigate(`/`)}/>
                            </div>
                        </div>
                        <div className="alertas">
                            <h1>Alerta</h1>
                            <i className="pi pi-stopwatch" style={{ fontSize: '6rem' }}></i>
                            <div className="button">
                                <Button label="Cadastro de Alertas" outlined onClick={() => navigate(`/cadastro-alerta`)}/>
                                <Button label="Listagem de Alertas" outlined onClick={() => navigate(`/`)}/>
                            </div>
                        </div>
                    </div>
                </main>
            </S.Container>
        </>
    );
}

export default Adm_Home;






{/* <div className="left">
                <ul>
                  <li>
                    <a>
                        
                      <Link to={'/'} >
                        <span className="icon" >
                        </span>
                        <span className="tittle">Cursos</span>
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a>
                      <Link to={'/Departamentos'}>
                        <span className="icon">
                        </span>
                        <span className="tittle">Departamentos</span>
                      </Link>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="right">
                <ul>
                  <li>
                    <a>
                      <Link to={'/Funcionarios'}>
                        <span className="icon">
                        </span>
                        <span className="tittle">Funcionarios</span>
                      </Link>
                    </a>
                  </li>
                </ul>
              </div> */}