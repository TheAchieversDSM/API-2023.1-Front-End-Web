import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import BG from '../buttonsGroup';

export default function TablePar(props:any) {
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
                <tr>
                    <td>200</td>
                    <td>Pluviômetro</td>
                    <td>pluviometro</td>
                    <td>mm</td>
                    <td><BG/></td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}