import { Button } from 'react-bootstrap'

export default function ButtonMain(props: any) {
    return(
        <Button variant="primary" type={props.type} className="btn-create" onClick={props.onClick}><b>{props.label}</b></Button>
    )
}