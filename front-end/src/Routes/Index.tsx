import { Route, Routes as RoutesWrapper } from "react-router-dom";
import CadastroEstacao from "../Pages/Admin/CadastroEstacoes";
import CadastroParametro from "../Pages/Admin/CadastroParametros";
import CadastroAlerta from "../Pages/Admin/CadastroAlert";
import CadastroUsuario from "../Pages/Admin/CadastroUsuario";
import ListagemEstacao from "../Pages/Admin/ListagemEstacoes";
import VizualizacaoEstacao from "../Pages/Admin/VisualizacaoEstacao";
import Login from "../Pages/Admin/Login";

function Routes() {
    return (
        <RoutesWrapper>
            <Route path="/cadastro-estacao" element={< CadastroEstacao />} />
            <Route path="/cadastro-parametro" element={< CadastroParametro />} />
            <Route path="/cadastro-alerta" element={< CadastroAlerta />} />
            <Route path="/cadastro-usuario" element={< CadastroUsuario />} />
            <Route path="/visualizacao-estacao" element={< VizualizacaoEstacao />} />
            <Route path="/visualizacao-estacao/:id" element={< VizualizacaoEstacao />} />
            <Route path="/login" element={< Login />} />
            <Route path="/" element={< ListagemEstacao />} />
        </RoutesWrapper>
    );
}

export default Routes;