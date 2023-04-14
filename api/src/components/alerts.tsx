import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import '../styles/alert.css';

export default function Alerts(){
    const [show, setShow] = useState(true);

  if (show) {
    return (
        <>
            <Alert variant="danger" onClose={() => setShow(false)} dismissible className="alerta">
                <Alert.Heading><b>CRÍTICO!</b></Alert.Heading>
                <p>
          
                </p>
            </Alert>

            <Alert variant="warning" onClose={() => setShow(false)} dismissible className="alerta">
                <Alert.Heading><b>PERIGO!</b></Alert.Heading>
                <p>
          
                </p>
            </Alert>

            <Alert variant="secondary" onClose={() => setShow(false)} dismissible className="alerta">
                <Alert.Heading><b>ATENÇÃO!</b></Alert.Heading>
                <p>
          
                </p>
            </Alert>
        </>
    );
  }
  return <Button onClick={() => setShow(true)} className="btn-alert">Show Alert</Button>;
}