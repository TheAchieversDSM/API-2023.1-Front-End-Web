import axios from 'axios';
import {useParams} from "react-router-dom";
import Sidebar from '../components/sidebar';
import React, { useEffect, useState } from 'react';

import '../styles/dashboard.css'
import Chart from '../components/chart';
import { EstacaoParametro } from '../utils/types/types';
import Navigation from '../components/nav/nav';
import NavItem from '../components/nav/navItem';
import { log } from 'console';

export default function Dashboard() {
    const {estacaoId} = useParams()
     

    const [estacaoParametros, setEstacaoParametros] = useState<[EstacaoParametro]>([{id: 0, nome: "", unidadeDeMedida: "string"}]);
    const [medidas, setMedidas] = useState()
    const [options, setOptions] = useState()

    useEffect(()=>{
        function render(){
            axios.get(`http://localhost:5000/estacao/pegarEstacoesPorId/${estacaoId}`).then(res =>{
                setEstacaoParametros(res.data)
            })
        }
        if(estacaoParametros){
            setEstacaoParametros( [
                {
                id: 1,
                nome: 'Estação 1',
                unidadeDeMedida: 'Celsius'
                },
            ])
        }
        render()
    },[])

    console.log(typeof estacaoParametros)
    const optionss = {
        chart: {
            type: 'spline',
            width: 1200,
            height: 500,
            
        },
        title: {
            text: 'Temperaturas diárias'
        },
        xAxis: {
            type:"datetime"
        },
        yAxis: {
            title: {
                text: 'Temperatura (°C)'
            }
        },
        series: [{
            name: 'Máxima',
            data: [[1647529200000,26], [1647615600000,25], [1647702000000,23], [1647788400000,20], [1647874800000,18], [1647961200000,20], [1648047600000,22]],
            tooltip: {
                valueSuffix: '°F'
            },
        }, {
            name: 'Mínima',
            data: [[1647529200000,5], [1647615600000,6], [1647702000000,4], [1647788400000,8], [1647874800000,12], [1647961200000,10], [1648047600000,12]],
            tooltip: {
                valueSuffix: '°C'
            },
        }],
        rangeSelector: {
            buttons: [
              {
                type: "hour",
                count: 1,
                text: "1h",
              },
              {
                type: "day",
                count: 1,
                text: "1d",
              },
              {
                type: "week",
                count: 1,
                text: "1w",
              },
              {
                type: "month",
                count: 1,
                text: "1m",
              },
              {
                type: "year",
                count: 1,
                text: "1y",
              },
              {
                type: "all",
                text: "Tudo",
              },
            ],
            selected: 5,
            inputDateFormat: "%d/%m/%Y",
            inputEditDateFormat: "%d/%m/%Y"
          },
        lang: {
            noData: "Não há dados disponíveis para exibição."
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '24px',
                color: '#5751D3'
            }
        }
    }
    return (
        <>
            <Sidebar />
            <div className='main-body'>
                <h1 className="TitImp">Estação Fatec-SJC</h1>
                <div className='buttons_dashboard'>
                    <Navigation variant="pills" default="1">
                        <NavItem index={1} label="Todos" />
                        {estacaoParametros?.map((parametro,index)=>{
                            <NavItem index={index+2} label={parametro.nome} />
                        })}
                    </Navigation>
                </div>
                <div className='container_dashboard'>
                    <Chart className='container_dashboard' options={optionss} />
                </div>
            </div>

        </>
    )
}