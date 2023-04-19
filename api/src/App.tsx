import React from 'react';
// styles ✨
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components ✨
import Routes from './routes/routes';
import Alerts from './components/alerts';

export default function App() {
    return (
        <>
            <Alerts/>
            <Routes />
        </>
    );
}