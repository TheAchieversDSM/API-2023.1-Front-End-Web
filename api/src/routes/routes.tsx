import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import Login from "../pages/login";
import Alertas from "../pages/criar-alertas";
import Usuarios from "../pages/criar-usuarios";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Login />} />
                <Route path="/create-alertas" element={<Alertas />} />
                <Route path="/create-usuarios" element={<Usuarios />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes