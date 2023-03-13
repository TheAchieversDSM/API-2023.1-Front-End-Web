import Table from 'react-bootstrap/Table';
import "../styles/table.css"
import BG from './buttonsGroup';

export default function TableGlobal(props:any) {
  return (
    <div className="box-list">
        <Table className="table" striped bordered hover size="sm" >
            <thead>
                <tr>
                    <th>{props.id}</th>
                    <th>{props.nome}</th>
                    <th>{props.titulo1}</th>
                    <th>{props.titulo2}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>10294</td>
                    <td>Fulano de Tal</td>
                    <td>fulano_tal@email.com</td>
                    <td>Administrador</td>
                    <td><BG/></td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}