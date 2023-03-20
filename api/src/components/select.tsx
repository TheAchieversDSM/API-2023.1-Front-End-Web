import React from 'react'
import Select from 'react-select'
import { Form } from 'react-bootstrap'

export default function SelectMulti(props: any) {
    return (
        <Form.Group className={props.size}>
            <Form.Label>{props.label}</Form.Label>
            
            <Select
                isMulti
                name={props.name}
                placeholder={props.placeholder}
                options={props.options}
                onChange={props.onChange}
                isClearable={true}
                isSearchable={true}
                closeMenuOnSelect={props.close}
                onInputChange={props.onChange}
            />
        </Form.Group>
    )
}