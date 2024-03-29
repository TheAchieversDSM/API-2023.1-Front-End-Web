import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import HOME from "../pages/home";
import Usuarios from "../pages/usuarios";
import Alertas from "../pages/alertas";
import Dashboard from "../pages/dashboard";
import Parametros from "../pages/parametros";
import Estacao from "../pages/estacao";
import Login from "../pages/login";
import CriarAlertas from "../pages/criar-alertas";
import CriarEstacoes from "../pages/criar-estacoes";
import CriarUsuarios from "../pages/criar-usuarios";
import CriarParametros from "../pages/criar-parametros";
import Reports from "../pages/reports";
import EditarParametro from "../pages/editar-parametros";
import EditarUsuarios from "../pages/editar-usuario";
import EditarAlertas from "../pages/editar-alertas";
import EditarEstacoes from "../pages/editar-estacoes";
import DocParametro from "../pages/docParametro";
import DocAlerta from "../pages/docAlerta";

const Routes = () => {
    return (
        <Switch>
            <Route path="/home" element={<HOME />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/reports/:uid" element={<Reports />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/parametros" element={<Parametros />} />
            <Route path="/estacoes" element={<Estacao />} />
            <Route path="/" element={<Login />} />
            <Route path="/criar-alertas" element={<CriarAlertas />} />
            <Route path="/criar-estacoes" element={<CriarEstacoes />} />
            <Route path="/criar-usuarios" element={<CriarUsuarios />} />
            <Route path="/criar-parametros" element={<CriarParametros />} />
            <Route path="/editar-usuario/:id" element={<EditarUsuarios />} />
            <Route path="/editar-parametro/:id" element={<EditarParametro />} />
            <Route path="/editar-alerta/:id" element={<EditarAlertas />} />
            <Route path="/editar-estacao/:id" element={<EditarEstacoes />} />
            <Route path="/doc-parametro" element={<DocParametro />} />
            <Route path="/doc-alerta" element={<DocAlerta />} />
        </Switch>
    )
}

export default Routes