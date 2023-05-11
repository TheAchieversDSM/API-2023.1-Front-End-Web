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

    const attention = () => toast.info(
        <ToastMessage
            titulo="Alerta: Atenção"
            messagem={`Estação ${dados[0]?.value?.estacao} com paramêtros ${dados[0]?.value?.parametro}`}
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

    const perigo = () => toast.warn(
        <ToastMessage
            titulo="Alerta: Perigo"
            messagem={`Estação ${dados[0]?.value?.estacao} com paramêtros ${dados[0]?.value?.parametro}`}
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

    const critico = () => toast.error(
        <ToastMessage
            titulo="Alerta: Crítico"
            messagem={`Estação ${dados[0]?.value?.estacao} com paramêtros ${dados[0]?.value?.parametro}`}
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

                    /* axios.get(`http://localhost:5000/estacao/pegarEstacoes`).then((re) => {
                        re.data.map((estacao: any) => {
                            if (report.value.estacao == estacao.estacao_uid) {
                                setEstacao(estacao)
                            }
                        })
                    }) */
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
                <Link to={`/reports/${dados[0]?.value?.estacao}`}><ToastContainer /></Link>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
}