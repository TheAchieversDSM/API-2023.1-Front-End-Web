import React from 'react';

// components ✨
import Input from '../components/input';
import SelectMulti from '../components/select';
import Sidebar from '../components/sidebar';
import TextareaInput from '../components/textarea';
import Button from '../components/button'

import '../styles/criar-alertas.css'

export default function Alertas() {
    return (
        <>
            <Sidebar />

            <div className="main-body">
                <h1>Cadastro de Alertas</h1>
                
                <Input
                    label="Estação (ID/Nome)"
                    size="mb-6"
                    type="text"
                    placeholder="Insira o ID/nome da estação."
                />

                <Input
                    label="Valor"
                    size="mb-6"
                    type="number"
                    placeholder="Insira o valor para acionar o alerta."
                />

                <SelectMulti
                    label="Parâmetro"
                    size="mb-3"
                    name="Parametro"
                    placeholder="Selecione o parâmetro correspondente."
                    options={[]}
                    onChange={null}
                    close={true}
                />

                <TextareaInput
                    label="Mensagem"
                    placeholder="Insira a mensagem que deve aparecer ao alerta ser acionado."
                    height="100px"
                />

                <Button label="Criar!!!!!!!!!!!1"/>
            </div>
        </>
    )
}