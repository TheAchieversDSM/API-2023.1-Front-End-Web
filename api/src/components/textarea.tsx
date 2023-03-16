import React from 'react'
import { Form } from 'react-bootstrap'

export default function TextareaInput(props: any) {
    return (
        <Form.Group className={props.size}>

            <Form.Label>{props.label}</Form.Label>
            
            <Form.Control
                as="textarea"
                placeholder={props.placeholder}
                style={{ height: props.height }}
            />
        </Form.Group>
    )
}