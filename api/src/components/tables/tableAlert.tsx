import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../modal';
import { BsTrash3, BsEye, BsPencil, BsClipboard2 } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../search';

interface IAlerta {
    alerta_id: number;
    nome?: string;
    valorMax?: number;
    valorMinimo?: string;
    nivel?: number;
  }

export default function TableAlert() {
    const [alertas, setAlertas] = useState<IAlerta[]>([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() =>{
        function render(){
            axios.get("http://localhost:5000/alerta/pegarAlertas").then((res) =>{
                setAlertas(res.data)
            })
        }
        render()
    },[])


  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    function renderTableRows() {
        return alertas
          .filter((alerta) => {
            if (!searchTerm) {
              return true;
            }
    
            if (
              alerta?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              alerta.alerta_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
    
            return false;
          })
          .map((alerta) => (
            <tr>
                <td>{alerta.alerta_id}</td>
                <td>{alerta.nome}</td>
                <td>{alerta.valorMax}</td>
                <td>{alerta.valorMinimo}</td>
                <td>
                    <Link to={`/reports/${alerta.alerta_id}`}><Button className="bt bt-record"><BsClipboard2 className="icon" /></Button></Link>
                    <Button className="bt bt-edit"><BsPencil className="icon" /></Button>
                    <Button className="bt bt-delete"><BsTrash3 className="icon" /></Button>

                </td>
            </tr>
          ));
      }

  return (
    <>
    <Search change={handleSearch} link="/criar-alertas"/>
    <div className="box-list">
          <Table className="table" size="sm">
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
                {renderTableRows()} 
              </tbody>
          </Table>
      </div>
      </>
  )
}