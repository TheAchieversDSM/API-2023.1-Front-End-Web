import React from 'react'
import '../styles/search.css';
import Button from 'react-bootstrap/Button';

export default function Search(){
    return(
        <div className="box-search">
            <input className="input-search"></input>
            <Button variant="primary" className="button-new" size="lg"><p>+ Novo</p></Button>
        </div>
    )
}