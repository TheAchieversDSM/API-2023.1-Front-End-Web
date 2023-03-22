import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../modal';
import { BsTrash3, BsEye, BsPencil } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

let modelo = [
    {
        'id': '',
        'nome': '',
        'tipo': '',
        'unidadeDeMedida': '',
        'fator': '',
        'offset': ''
    }
]

export default function TablePar(props:any) {
    const [parametros, setParametros] = useState(modelo)
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        function render(){
            axios.get("http://localhost:5000/parametro/pegarParametros").then((res)=>{
                setParametros(res.data)
            })
        }
        render()
    }, [])

  return (
    <div className="box-list">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Unidade de medida</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {parametros.map(parametro =>
                    <tr>
                        <td>{parametro.id}</td>
                        <td>{parametro.nome}</td>
                        <td>{parametro.tipo}</td>
                        <td>{parametro.unidadeDeMedida}</td>
                        <td>            
                            <Button className="bt bt-view"><BsEye className="icon" onClick={() => setModalShow(true)}/></Button>
                            <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                            <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                            <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                titulo={parametro.nome}
                                coluna1="ID: " resp1={parametro.id}
                                coluna3="Tipo: " resp3={parametro.tipo}
                                coluna4="Unidade de medida: " resp4={parametro.unidadeDeMedida}
                                coluna5="Fator: " resp5={parametro.fator}
                                coluna6="OffSet: " resp6={parametro.offset}
                            />
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
  )
}