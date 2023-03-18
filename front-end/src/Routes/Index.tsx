import { Route, Routes as RoutesWrapper } from "react-router-dom";
import CadastroEstacao from "../Pages/Admin/CadastroEstacoes";
import VizualizacaoEstacao from "../Pages/Admin/VisualizacaoEstacao";

function Routes() {
    return (
        <RoutesWrapper>
            <Route path="/cadastro-estacao" element={< CadastroEstacao />} />
            <Route path="/visualizacao-estacao" element={< VizualizacaoEstacao />} />
        </RoutesWrapper>
    );
}

export default Routes;