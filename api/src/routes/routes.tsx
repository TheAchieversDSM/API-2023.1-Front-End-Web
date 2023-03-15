import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import Alertas from "../pages/criar-alertas";
import Usuarios from "../pages/usuarios";
import Alerts from "../pages/alertas";
import Parametros from "../pages/parametros";
import Estacao from "../pages/estacao";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/create-alertas" element={<Alertas />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/alertas" element={<Alerts />} />
                <Route path="/parametros" element={<Parametros />} />
                <Route path="/estacoes" element={<Estacao />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes