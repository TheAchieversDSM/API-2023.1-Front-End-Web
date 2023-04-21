import React from 'react';
// styles ✨
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components ✨
import Routes from './routes/routes';
import AlertaCritico from './components/alertas/alertaCritico';
import AlertaPerigo from './components/alertas/alertaPerigo';
import AlertaAtencao from './components/alertas/alertaAtencao';

export default function App() {
    return (
        <>
            <AlertaCritico/>
            <AlertaPerigo/>
            <AlertaAtencao/>
            <Routes />
        </>
    );
}