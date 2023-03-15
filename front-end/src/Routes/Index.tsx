import { Route, Routes as RoutesWrapper } from "react-router-dom";
import ListagemEstacao from "../Pages/Admin/ListagemEstacao";



function Routes() {
    return (
        <RoutesWrapper>
            <Route path="/listagem-estacao" element={< ListagemEstacao />} />
        </RoutesWrapper>
    );
}

export default Routes;