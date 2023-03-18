import React from 'react'
import '../styles/search.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Search(props: any){
    return(
        <div className="box-search">
            <input className="input-search"></input>
            <Button variant="primary" className="button-new" size="lg" ><Link to={props.link}><p>+ Novo</p></Link></Button>
        </div>
    )
}