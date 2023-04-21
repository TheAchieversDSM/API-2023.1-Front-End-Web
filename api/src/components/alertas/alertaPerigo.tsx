import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import '../../styles/alert.css';

export default function AlertaPerigo(){
    const [show, setShow] = useState(true);

    return (
        <>
            <div className="alert-container">
                <Alert key="warning" variant="warning"  dismissible className="alerta">
                    <Alert.Heading><b>PERIGO!</b></Alert.Heading>
                    <p>
                    </p>
                </Alert>
            </div>
        </>
    );
}