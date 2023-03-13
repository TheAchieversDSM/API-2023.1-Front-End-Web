import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import Alertas from "../pages/criar-alertas";
import Usuarios from "../pages/usuarios";
import Parametros from "../pages/parametros";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/parametros" element={<Parametros />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes