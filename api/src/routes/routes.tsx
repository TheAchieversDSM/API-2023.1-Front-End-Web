import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import Alertas from "../pages/criar-alertas";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/create-alertas" element={<Alertas />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes