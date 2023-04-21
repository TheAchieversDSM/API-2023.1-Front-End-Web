import React, { useEffect, useState } from 'react';
import axios from 'axios';

// styles ✨
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components ✨
import Routes from './routes/routes';
import Alerts from './components/alerts';
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter } from 'react-router-dom';
import AlertaAtencao from './components/alertas/alertaAtencao';
import AlertaPerigo from './components/alertas/alertaPerigo';
import AlertaCritico from './components/alertas/alertaCritico';
import Swal from 'sweetalert2';


export default function App() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: true,
        timer: 15000,
        timerProgressBar: true
      })
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get(`http://localhost:5000/report/redis-alertas`).then((res) => {
                console.log(res.data)
                res.data.map((report: any) => {
                    if (report.value.nivel == "1") {
                        console.log("aaa")
                        Toast.fire({
                            icon: 'info',
                            title: 'Atenção'
                          })
                    }
                    else if (report.value.nivel == "2") {
                        console.log("aaa2")
                        Toast.fire({
                            icon: 'warning',
                            title: 'Perigo'
                          })
                    } 
                    else if (report.value.nivel == "3") {
                        console.log("aaa3")
                        Toast.fire({
                            icon: 'error',
                            title: 'Crítico'
                          })
                    }
                })
            })

        }, 60000);
        return () =>{
            clearInterval(intervalId)
        }
        
    }, []);

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
}