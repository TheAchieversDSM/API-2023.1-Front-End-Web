import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import BG from '../buttonsGroup';

export default function TableEst() {
  return (
    <div className="box-list">
        <Table className="table" size="sm" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>6583</td>
                    <td>Station</td>
                    <td>-28.1845</td>
                    <td>32.9533</td>
                    <td><BG/></td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}