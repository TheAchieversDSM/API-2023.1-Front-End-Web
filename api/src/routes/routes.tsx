import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import HOME from "../pages/home";
import Usuarios from "../pages/usuarios";
import Alertas from "../pages/alertas";
import Parametros from "../pages/parametros";
import Estacao from "../pages/estacao";
import Login from "../pages/login";
import CriarAlertas from "../pages/criar-alertas";
import CriarEstacoes from "../pages/criar-estacoes";
import CriarUsuarios from "../pages/criar-usuarios";
import CriarParametros from "../pages/criar-parametros";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<HOME />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/parametros" element={<Parametros />} />
                <Route path="/estacoes" element={<Estacao />} />
                <Route path="/login" element={<Login />} />
                <Route path="/criar-alertas" element={<CriarAlertas />} />
                <Route path="/criar-estacoes" element={<CriarEstacoes />} />
                <Route path="/criar-usuarios" element={<CriarUsuarios />} />
                <Route path="/criar-parametros" element={<CriarParametros />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes