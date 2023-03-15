import { Route, Routes as RoutesWrapper } from "react-router-dom";
import ListagemEstacao from "../Pages/Admin/ListagemEstacao";
import CadastroEstacao from "../Pages/Admin/CadastroEstacoes";


function Routes() {
    return (
        <RoutesWrapper>
            <Route path="/listagem-estacao" element={< ListagemEstacao />} />
            <Route path="/cadastro-estacao" element={< CadastroEstacao />} />
        </RoutesWrapper>
    );
}

export default Routes;