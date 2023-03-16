import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import Alertas from "../pages/criar-alertas";
import Dashboard from "../pages/dashboard";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/create-alertas" element={<Alertas />} />
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/dashboard/:id" element={<Dashboard />}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes