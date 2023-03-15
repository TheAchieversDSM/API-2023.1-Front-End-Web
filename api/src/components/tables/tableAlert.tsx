import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import BG from '../buttonsGroup';

export default function TableAlert() {
  return (
    <div className="box-list">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Estação</th>
                    <th>Parâmetro</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>935457</td>
                    <td>Station</td>
                    <td>Velocidade do vento</td>
                    <td>30 km/h</td>
                    <td><BG/></td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}