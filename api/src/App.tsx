import React, { useEffect, useState } from 'react';
import axios from 'axios';

// styles ✨
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components ✨
import Routes from './routes/routes';
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter, Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    const [dados, setDados] = useState<any>([])
/*     const [estacao, setEstacao] = useState<any>([]) */

    const ToastMessage = ({ titulo, messagem }: { titulo: string, messagem: string }) => {
        return (
            <>
                <h1 style={{ fontSize: '18px' }}>{titulo}</h1>
                <p>{messagem}</p>
            </>
        )
    }

    const attention = (report: any) => toast.info(
        <ToastMessage
            titulo="Alerta: Atenção"
            messagem={`Estação ${report?.estacao} com paramêtros ${report?.parametro}`}
        />, {
        autoClose: 10000,
        closeButton: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const perigo = (report: any) => toast.warn(
        <ToastMessage
            titulo="Alerta: Perigo"
            messagem={`Estação ${report?.estacao} com paramêtros ${report?.parametro}`}
        />, {
        autoClose: 10000,
        closeButton: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const critico = (report: any) => toast.error(
        <ToastMessage
            titulo="Alerta: Crítico"
            messagem={`Estação ${report?.estacao} com paramêtros ${report?.parametro}`}
        />, {
        autoClose: 10000,
        closeButton: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const naoCadastrada = (report: any) => toast(
        <ToastMessage
            titulo={report.parametro?`Parametro não cadastrado: ${report.parametro} `: `Estação não cadastrada, UID: ${report.estacao} `}
            messagem={report.msg}
        />, {
        autoClose: 10000,
        closeButton: true,
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
                    console.log(report)
                    if (report.nivel == "1") {
                        attention(report)
                    }
                    else if (report.nivel == "2") {
                        perigo(report)
                    }
                    else if (report.nivel == "3") {
                        critico(report)
                    }else if (report.key.split(":")[2] == "not_exist"){
                        naoCadastrada(report)
                    }
                })
            })           

        }, 10000);
        return () => {
            clearInterval(intervalId)
        }

    }, []);

    return (
        <BrowserRouter>
            <AuthProvider>
                <Link to={`/reports/${dados[0]?.value?.estacao}`}><ToastContainer /></Link>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
}