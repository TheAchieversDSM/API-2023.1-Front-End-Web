import React from 'react'
import { Container } from "react-bootstrap";
import Sidebar from "../components/sidebar";
import "../styles/documentacao.css"

export default function DocParametro(){
    return(
        <>
            <Sidebar />
            <h1 className="TitImp">Sensores e Parâmetros</h1>
            <Container className="cont-doc">
                <div className="box-doc">
                    <h4>Termômetro</h4>
                    <p className="doc-txt">Um sensor termômetro é um dispositivo usado para medir a temperatura do ar ou de uma superfície. O sensor termômetro geralmente é composto por um material termossensível que se expande ou contrai de acordo com a variação de temperatura.</p>
                    <p className="doc-txt">A fórmula utilizada para converter a variação de comprimento do material termossensível em uma medida de temperatura é baseada no coeficiente de dilatação do material e na variação de sua resistência elétrica. Essa fórmula é chamada de equação de calibração do sensor termômetro.</p>
                    <p><i><b>T = a + bR</b></i></p>
                    <ul className="doc-formula">
                        <li>T = temperatura em °C</li>
                        <li>R = resistência elétrica do sensor termômetro</li> 
                        <li>a e b = constantes que dependem das características do sensor e são determinadas durante o processo de calibração</li>
                    </ul>

                    <br/>

                    <h4>Higrômetro</h4>
                    <p>O sensor higrômetro é um dispositivo que mede a umidade do ar em uma estação meteorológica. Existem diferentes tipos de sensores higrômetros, mas um dos mais comuns é o sensor capacitivo.</p>
                    <p>O sensor capacitivo é composto por duas placas paralelas, sendo uma delas recoberta por um material higroscópico, que absorve ou libera água conforme a umidade relativa do ar. A variação da umidade relativa do ar altera a capacitância do sensor, que é medida eletronicamente.</p>
                    <p>A fórmula utilizada para obter a umidade relativa do ar é baseada na equação de capacidade elétrica de um capacitor:</p>
                    <p><i><b>C = εA/d</b></i></p>
                    <ul className="doc-formula">
                        <li>C = Capacitância</li>
                        <li>ε = constante dielétrica</li> 
                        <li>A = área das placas do sensor</li>
                        <li>d = distância entre as placas.</li>
                    </ul>
                    <p>A umidade relativa do ar pode ser calculada a partir da capacitância medida pelo sensor e da capacitância máxima quando o sensor está completamente úmido:</p>
                    <p><i><b>UR = (C - C_min) / (C_max - C_min) x 100%</b></i></p>
                    <ul className="doc-formula">
                        <li>UR = Umidade relativa do ar</li>
                        <li>C = capacitância medida do sensor</li> 
                        <li>C_min = capacitância mínima do sensor</li>
                        <li>C_max = capacitância máxima do sensor</li>
                    </ul>

                    <br/>

                    <h4>Barômetro</h4>
                    <p>O sensor barômetro é responsável pela medição da pressão atmosférica em um determinado local. A pressão atmosférica é a força exercida pelo peso da atmosfera sobre a superfície da Terra, e varia de acordo com fatores como altitude, temperatura e umidade.</p>
                    <p>O sensor barômetro mais comum em estações meteorológicas é o sensor de pressão absoluta, que mede a pressão em relação ao vácuo. A fórmula envolvida para obter a medida correta da pressão atmosférica é a seguinte:</p>
                    <p><i><b>P = ρgh</b></i></p>
                    <ul className="doc-formula">
                        <li>P = pressão atmosférica em pascals (Pa)</li>
                        <li>ρ = densidade do ar em kg/m³</li> 
                        <li>g = aceleração da gravidade em m/s²</li>
                        <li>h = altura da coluna de ar acima do sensor em metros (m)</li>
                    </ul>

                    <br/>

                    <h4>Anemômetro</h4>
                    <p>O anemômetro é o sensor utilizado para medir a velocidade do vento em uma estação meteorológica. Ele possui um conjunto de pás que são movidas pela força do vento, e um mecanismo interno que converte o movimento das pás em um sinal elétrico que pode ser lido pelo instrumento de medição.</p>
                    <p>A velocidade do vento é proporcional ao número de rotações dos copos por unidade de tempo.</p>
                    <p><i><b>V = d/t</b></i></p>
                    <ul className="doc-formula">
                        <li>V = velocidade do vento</li>
                        <li>d = distância percorrida pelos copos</li> 
                        <li>t = tempo</li>
                    </ul>
                    <p>Para obter a velocidade média do vento em um determinado período de tempo, é necessário calcular a média das leituras de velocidade em intervalos regulares.</p>
                
                    <br/>

                    <h4>Pluviômetro</h4>
                    <p>O pluviômetro é um instrumento utilizado para medir a quantidade de chuva que cai em determinado local. Ele é composto por um recipiente cilíndrico graduado, onde a água da chuva é coletada e medida em milímetros ou litros por metro quadrado. A fórmula para calcular a quantidade de chuva coletada pelo pluviômetro é simples: basta medir a altura da água acumulada no recipiente graduado e multiplicá-la pela área da base do cilindro.</p>
                    <p>A fórmula para calcular a área da base do cilindro é:</p>
                    <p><i><b>A = πr²</b></i></p>
                    <ul className="doc-formula">
                        <li>π = 3,1415</li>
                        <li>r = raio da base do cilindro</li> 
                    </ul>
                </div>
            </Container>
        </>
    )
}