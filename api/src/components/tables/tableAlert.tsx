import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../modal';
import { BsTrash3, BsEye, BsPencil, BsClipboard2 } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IAlerta {
    alerta_id: number;
    nome?: string;
    valorMax?: number;
    valorMinimo?: string;
    nivel?: number;
  }

export default function TableAlert() {
    const [alertas, setAlertas] = useState<IAlerta[]>([])
    const [modalShow, setModalShow] = React.useState(false);
    const [modalData, setModalData] = React.useState<IAlerta>();

    useEffect(() =>{
        function render(){
            axios.get("http://localhost:5000/alerta/pegarAlertas").then((res) =>{
                setAlertas(res.data)
            })
        }
        render()
    },[])

    const handleShowModal = (alerta: any) => {
        setModalData(alerta);
        setModalShow(true);
      };

  return (
    <div className="box-list">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Valor Máximo</th>
                    <th>Valor Minimo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {alertas.map(alerta =>
                    <tr>
                    <td>{alerta.alerta_id}</td>
                    <td>{alerta?.nome}</td>
                    <td>{alerta?.valorMax}</td>
                    <td>{alerta?.valorMinimo}</td>
                    <td>      
                        <Button className="bt bt-record"><BsClipboard2 className="icon"/></Button>      
                        <Button className="bt bt-view"><BsEye className="icon" onClick={() => handleShowModal(alerta)}/></Button>
                        <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                        <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                        
                        
                    </td>
                </tr>)}
                <MyVerticallyCenteredModal
                            show={modalShow}
                            {...modalData}
                            onHide={() => setModalShow(false)}
                            titulo={modalData?.nome}
                            coluna1="ID: " resp1={modalData?.alerta_id}
                            coluna2="Nível: " resp2={modalData?.nivel}
                            coluna3="Valor Máximo: " resp3={modalData?.valorMax}
                            coluna4="Valor Minimo: " resp4={modalData?.valorMinimo}
                        />
            </tbody>
        </Table>
    </div>
  )
}