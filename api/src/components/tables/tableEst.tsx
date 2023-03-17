import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil } from 'react-icons/bs'

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
                    <td>
                        <Button className="bt bt-view"><BsEye className="icon"/></Button>
                        <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
                        <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}