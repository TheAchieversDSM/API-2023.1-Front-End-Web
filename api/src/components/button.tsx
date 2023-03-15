import { Button } from 'react-bootstrap'

export default function ButtonMain(props: any) {
    return(
        <Button variant="primary" type={props.type}>{props.label}</Button>
    )
}