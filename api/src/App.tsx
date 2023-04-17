import React from "react";
import { BrowserRouter } from "react-router-dom";
// styles ✨
import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

// components ✨
import Routes from "./routes/routes";
import { AuthProvider } from "./hooks/useAuth";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}
