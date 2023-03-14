import {Table} from 'react-bootstrap';
import "../../styles/table.css"
import BG from '../buttonsGroup';

export default function TableUsu(props:any) {
  return (
    <div className="box-list">
        <Table className="table" striped bordered hover size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Nível</th>
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