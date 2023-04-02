import React from "react";
import { Nav } from "react-bootstrap";

export default function NavItem(props: any){
    return(
        <Nav.Item>
            <Nav.Link href={props.href} eventKey={props.index} onClick={props.function}>{props.label}</Nav.Link>
        </Nav.Item>
    )
}