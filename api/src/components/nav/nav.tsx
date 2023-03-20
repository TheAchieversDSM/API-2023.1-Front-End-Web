import React from "react";
import { Nav } from "react-bootstrap";

export default function Navigation(props: any){
    return(
        <Nav variant={props.variant}  defaultActiveKey={props.default}>
            {props.children}
        </Nav>
    )
}