import Table from 'react-bootstrap/Table';
import "../styles/table.css"
import BG from './buttonsGroup';

export default function TableGlobal() {
  return (
    <div className="box-list">
        <Table className="table" striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>10294</td>
                    <td>Fulano de Tal</td>
                    <td>fulano_tal@email.com</td>
                    <td><BG/></td>
                </tr>
                <tr>
                    <td>10295</td>
                    <td>Fulano de Tal</td>
                    <td>fulano_tal@email.com</td>
                    <td><BG/></td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}