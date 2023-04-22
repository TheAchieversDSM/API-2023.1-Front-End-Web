import React, { useEffect, useState } from 'react';
import axios from 'axios';

// styles ✨
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components ✨
import Routes from './routes/routes';
import Alerts from './components/alerts';
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    const [dados, setDados] = useState<any>([])

    const attention = () => toast.info("Alerta: Atenção!", {
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const perigo = () => toast.warn("Alerta: Perigo!", {
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const critico = () => toast.error("Alerta: Crítico!", {
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get(`http://localhost:5000/report/redis-alertas`).then((res) => {
                setDados(res.data)
                res.data.map((report: any) => {
                    if (report.value.nivel == "1") {
                        attention()
                    }
                    else if (report.value.nivel == "2") {                        
                        perigo()
                    }
                    else if (report.value.nivel == "3") {                        
                        critico()
                    }
                })
            })

        }, 60000);
        return () => {
            clearInterval(intervalId)
        }

    }, []);

    return (
        <BrowserRouter>
            <AuthProvider>
                <Link to={`/reports/${dados[0].value.estacao}`}><ToastContainer /></Link>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
}