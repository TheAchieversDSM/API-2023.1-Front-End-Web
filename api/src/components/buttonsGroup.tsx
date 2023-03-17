import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil } from 'react-icons/bs'
import "../styles/table.css"

export default function BG(){
    return(
        <>
            <Button className="bt bt-view"><BsEye className="icon"/></Button>
            <Button className="bt bt-edit"><BsPencil className="icon"/></Button>
            <Button className="bt bt-delete"><BsTrash3 className="icon"/></Button>
        </>
    )
}