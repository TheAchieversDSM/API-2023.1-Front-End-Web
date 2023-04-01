import axios from 'axios';
import { useParams } from "react-router-dom";
import Sidebar from '../components/sidebar';
import { useEffect, useState } from 'react';

import '../styles/dashboard.css'
import Chart from '../components/chart';
import { EstacaoParametro, MediasSeries } from '../utils/types/types';
import Navigation from '../components/nav/nav';
import NavItem from '../components/nav/navItem';
import metricMount from '../utils/chart_utils/metricMount/metricMount';
import Options from '../utils/chart_utils/options/options';
import averageCalculator from '../utils/chart_utils/averageCalculator/averageCalculator';
import chartMount from '../utils/chart_utils/chartMount/chartMount';
import groupByUnixtime from '../utils/chart_utils/groupUnixtime/groupUnixtime';

export default function Dashboard() {
    const { id } = useParams()
    const [estacaoNome, setEstacaoNome] = useState()
    const [estacaoParametros, setEstacaoParametros] = useState<[EstacaoParametro]>();
    const [medidas, setMedidas] = useState<Array<MediasSeries>>();
    const [options, setOptions] = useState<Options>()
    console.log(estacaoParametros)
    useEffect(() => {
        console.log(id)
        function render() {
            axios.get(`http://localhost:5000/parametro/pegarMedidaEstacaoParametro/${id}`).then(res => {
                console.log(res.data)
                setEstacaoNome(res.data.nome)
                setEstacaoParametros(res.data)
            })

        }

        render()
    }, [])

    useEffect(() => {
        const medidasseries: MediasSeries[] = []
        estacaoParametros?.map((parametro: EstacaoParametro) => {
            if (parametro.medidas[0].unixtime) {
                parametro.medidaMedia = averageCalculator(groupByUnixtime(parametro.medidas))
                const med = { nome: parametro.nome, sufixo: { nome: ' '+ parametro.unidadeDeMedida.nome, id: parametro.unidadeDeMedida.unidade_id }, media: parametro.medidaMedia }
                medidasseries.push(med)
            }
        })
        setMedidas(medidasseries)


        if (medidas) {
            const metrics = metricMount(medidas)
            setOptions(chartMount(metrics))
        }

    }, [estacaoParametros])

    return (
        <>
            <Sidebar />
            <div className='main-body'>
                <h1 className="TitImp">Estação {estacaoNome}</h1>
                <div className='buttons_dashboard'>

                    <Navigation variant="pills" default="1">
                        <NavItem index={1} label="Todos" />
                        {estacaoParametros?.map((parametro, index) =>

                            <NavItem index={index + 2} label={parametro.nome} />
                        )}
                    </Navigation>
                </div>
                <div className='container_dashboard'>
                    <Chart className='container_dashboard' options={options} />
                </div>
            </div>

        </>
    )
}