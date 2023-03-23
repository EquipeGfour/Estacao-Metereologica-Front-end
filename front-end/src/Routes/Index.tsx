import { Route, Routes as RoutesWrapper } from "react-router-dom";
import CadastroEstacao from "../Pages/Admin/CadastroEstacoes";
import CadastroParametro from "../Pages/Admin/CadastroParametros";
import ListagemEstacao from "../Pages/Admin/ListagemEstacoes";
import VizualizacaoEstacao from "../Pages/Admin/VisualizacaoEstacao";

function Routes() {
    return (
        <RoutesWrapper>
            <Route path="/cadastro-estacao" element={< CadastroEstacao />} />
            <Route path="/cadastro-parametro" element={< CadastroParametro />} />
            <Route path="/visualizacao-estacao" element={< VizualizacaoEstacao />} />
            <Route path="/" element={< ListagemEstacao />} />
        </RoutesWrapper>
    );
}

export default Routes;