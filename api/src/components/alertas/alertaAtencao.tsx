import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import '../../styles/alert.css';

export default function AlertaCritico(){
    const [show, setShow] = useState(true);

    return (
        <>
            <div className="alert-container">
                <Alert key="dark" variant="dark"  dismissible className="alerta">
                    <Alert.Heading><b>ATENÇÃO!</b></Alert.Heading>
                    <p>
                    </p>
                </Alert>
            </div>
        </>
    );
}