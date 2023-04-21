import React, { useEffect } from 'react';
import axios from 'axios';

// styles ✨
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components ✨
import Routes from './routes/routes';
import Alerts from './components/alerts';
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get(`http://localhost:5000/report/redis-alertas`).then((res) => {
                res.data.map((report: any) => {
                    if (report.value.nivel == "1") {

                    }
                    else if (report.value.nivel == "2") {

                    } 
                    else if (report.value.nivel == "3") {

                    }
                })
            })

        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
}