import React from 'react'
import { Form } from 'react-bootstrap'

export default function TextareaInput(props: any) {
    return (
        <Form.Group className={props.size}>

            <Form.Label>{props.label}</Form.Label>
            
            <Form.Control
                required
                as="textarea"
                name={props.name}
                placeholder={props.placeholder}
                style={{ height: props.height }}
                onChange={props.onChange}
                defaultValue={props.default}
            />
        </Form.Group>
    )
}