import { Route, Routes as RoutesWrapper } from "react-router-dom";
import CadastroEstacao from "../Pages/Admin/CadastroEstacoes";
import CadastroParametro from "../Pages/Admin/CadastroParametros";
import CadastroAlerta from "../Pages/Admin/CadastroAlert";
import CadastroUsuario from "../Pages/Admin/CadastroUsuario";
import ListagemEstacao from "../Pages/Admin/ListagemEstacoes";
import VizualizacaoEstacao from "../Pages/Admin/VisualizacaoEstacao";
import Login from "../Pages/Admin/Login";
import ListagemParametros from "../Pages/Admin/ListagemParametros";
import ListagemAlertas from "../Pages/Admin/ListagemAlertas";
import ListagemAlertasDisparados from "../Pages/Admin/ListagemAlertasDisparados";
import HomeAdmin from "../Pages/Admin/HomeAdmin";
import ListagemMedidas from "../Pages/Admin/ListagemMedidas";


function Routes() {
    return (
        <RoutesWrapper>
            <Route path="/listagem-alertas" element={< ListagemAlertas />} />
            <Route path="/listagem-parametros" element={< ListagemParametros />} />
            <Route path="/cadastro-estacao" element={< CadastroEstacao />} />
            <Route path="/cadastro-parametro" element={< CadastroParametro />} />
            <Route path="/cadastro-alerta" element={< CadastroAlerta />} />
            <Route path="/cadastro-usuario" element={< CadastroUsuario />} />
            <Route path="/visualizacao-estacao" element={< VizualizacaoEstacao />} />
            <Route path="/visualizacao-estacao/:id" element={< VizualizacaoEstacao />} />
            <Route path="/login" element={< Login />} />
            <Route path="/" element={< HomeAdmin />} />
            <Route path="/listagem-estacao" element={< ListagemEstacao />} />
            <Route path="/listagem-alertas" element={<ListagemAlertas />} />
            <Route path="/listagem-alertas-disparados" element={<ListagemAlertasDisparados />} />
            <Route path="/listagem-medidas" element ={<ListagemMedidas/>} />

        </RoutesWrapper>
    );
}

export default Routes;