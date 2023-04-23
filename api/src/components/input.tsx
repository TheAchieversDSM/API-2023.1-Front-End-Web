import React from 'react'

import { Form } from 'react-bootstrap'

export default function Input(props: any) {
    return (
        <Form.Group className={props.size}>
            <Form.Label>{props.label}</Form.Label>

            <Form.Control 
                defaultValue={props.default} 
                name={props.name} 
                type={props.type} 
                placeholder={props.placeholder} 
                onChange={props.onChange}  
                step="any"
            />

        </Form.Group>
    )
}