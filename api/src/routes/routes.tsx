import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";

// pages ✨
import Alertas from "../pages/alertas";
import HOME from "../pages/home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/" element={<HOME />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes