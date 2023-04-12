import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CreatableSelect from 'react-select/creatable';


export default function ModalForm2(props: any) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.titulo}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{props.campo1}</Form.Label>
                            <Form.Control
                                type={props.tipo1}
                                name={props.name1}
                                placeholder={props.placeholder1}
                                autoFocus
                                value={props.value1}
                                onChange={props.function1}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{props.campo2}</Form.Label>
                            <Form.Control
                                as="textarea"
                                name={props.name2}
                                placeholder={props.placeholder2}
                                value={props.value2}
                                autoFocus
                                style={{ height: props.height }}
                                onChange={props.function2}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="label">{props.campo3}</Form.Label>
                            <CreatableSelect
                                isClearable
                                value={props.value3}
                                name={props.name3}
                                placeholder={props.placeholder3}
                                onChange={props.function3}
                                options={props.options3}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="label">{props.campo4}</Form.Label>
                            <CreatableSelect
                                isClearable
                                value={props.value4}
                                name={props.name4}
                                placeholder={props.placeholder4}
                                onChange={props.function4}
                                options={props.options4}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{props.campo5}</Form.Label>
                            <Form.Control
                                type={props.tipo5}
                                name={props.name5}
                                placeholder={props.placeholder5}
                                autoFocus
                                value={props.value5}
                                onChange={props.function5}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{props.campo6}</Form.Label>
                            <Form.Control
                                type={props.tipo6}
                                name={props.name6}
                                placeholder={props.placeholder6}
                                autoFocus
                                onChange={props.function6}
                                value={props.value6}
                            />
                        </Form.Group>
                    </Form>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.function}>
                            Fechar
                        </Button>
                        <Button variant="primary-botaozinho" onClick={props.function}>
                            Salvar Alterações
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}