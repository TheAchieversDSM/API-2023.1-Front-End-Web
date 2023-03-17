import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import Login from "../pages/login";
import Alertas from "../pages/criar-alertas";
import Estacoes from "../pages/criar-estacoes";
import Usuarios from "../pages/criar-usuarios";
import Parametros from "../pages/criar-parametros";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Login />} />
                <Route path="/create-alertas" element={<Alertas />} />
                <Route path="/create-estacoes" element={<Estacoes />} />
                <Route path="/create-usuarios" element={<Usuarios />} />
                <Route path="/create-parametros" element={<Parametros />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes