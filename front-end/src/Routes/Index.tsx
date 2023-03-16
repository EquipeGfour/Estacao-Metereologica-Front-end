import { Route, Routes as RoutesWrapper } from "react-router-dom";
import Home from "../Components/Home";


function Routes() {
    return (
        <RoutesWrapper>
            <Route path="/" element={< Home />} />
        </RoutesWrapper>
    );
}

export default Routes;