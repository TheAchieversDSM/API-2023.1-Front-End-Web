import React from 'react'

import { FloatingLabel, Form } from 'react-bootstrap'

export default function Input(props: any) {
    return (
        <Form.Group className={props.size}>
            <Form.Label>{props.label}</Form.Label>

            <Form.Control type={props.type} placeholder={props.placeholder} onChange={props.onChange}/>
        </Form.Group>
    )
}