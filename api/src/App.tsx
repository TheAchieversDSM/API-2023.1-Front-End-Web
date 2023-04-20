import React from 'react';

// styles ✨
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// components ✨
import Routes from './routes/routes';
import Alerts from './components/alerts';
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
}