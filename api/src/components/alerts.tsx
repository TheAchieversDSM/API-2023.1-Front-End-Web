import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import '../styles/alert.css';

export default function Alerts(){
    const [show, setShow] = useState(true);

  if (show) {
    return (
        <>
                <div className="alert-container">
                    <Alert key="danger" variant="danger" onClose={() => setShow(false)} dismissible className="alerta">
                        <Alert.Heading><b>CRÍTICO!</b></Alert.Heading>
                        <p>
                        </p>
                    </Alert>
                    <Alert key="warning" variant="warning" onClose={() => setShow(false)} dismissible className="alerta">
                        <Alert.Heading><b>CRÍTICO!</b></Alert.Heading>
                        <p>
                        </p>
                    </Alert>
                <Alert key="dark" variant="dark" onClose={() => setShow(false)} dismissible className="alerta">
                        <Alert.Heading><b>CRÍTICO!</b></Alert.Heading>
                        <p>
                        </p>
                    </Alert>
                </div>
                </>
    );
  }
  return <Button onClick={() => setShow(true)} className="btn-alert">Show Alert</Button>;
}