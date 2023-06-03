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
                        <li>a = fator de conversão</li>
                        <li>b = offset</li>
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

                    <h4>Anemômetro (sensor de vento de copos e direção)</h4>
                    <p>O anemômetro de direção é um tipo de sensor usado para medir a direção do vento. Ele geralmente consiste em uma haste vertical com um conjunto de aletas ou uma hélice montada na parte superior. As aletas ou a hélice são projetadas para apontar na direção do vento, permitindo que o sensor determine a orientação do vento.</p>
                    <p>A direção do vento é determinada por meio de sensores óticos ou magnéticos que detectam a posição das aletas ou da hélice em relação a um ponto de referência, como o norte. Com base nessas leituras, o sensor fornece a direção do vento em graus, onde <b>0° ou 360° geralmente representa o norte, 90° representa o leste, 180° representa o sul e 270° representa o oeste</b>.</p>
                    <p>Para calcular a velocidade do vento, um anemômetro de velocidade do vento é utilizado em conjunto com o anemômetro de direção. O anemômetro de velocidade mede a velocidade do vento em unidades como metros por segundo (m/s) ou quilômetros por hora (km/h). A fórmula básica para calcular a velocidade do vento é:</p>
                    <p><i><b>V = (N * C) / T</b></i></p>
                    <ul className="doc-formula">
                        <li>V = velocidade do vento</li>
                        <li>N = número de rotações completas dos copos</li> 
                        <li>C = fator de conversão (relação entre rotações e velocidade do vento) **</li>
                        <li>T = tempo</li>
                    </ul>
                    <p>**O fator de conversão C é determinado com base no design do anemômetro e pode variar de um modelo para outro. É importante consultar as especificações técnicas do anemômetro para obter o valor correto do fator de conversão.</p>
                    <p>Para obter a velocidade média do vento em um determinado período de tempo, é necessário calcular a média das leituras de velocidade em intervalos regulares.</p>
                
                    <br/>

                    <h4>Pluviômetro</h4>
                    <p>O pluviômetro por pulso é um sensor utilizado para medir a quantidade de chuva. Ele gera um pulso elétrico sempre que uma gota de chuva atinge o sensor. A quantidade de pulsos está diretamente relacionada à quantidade de chuva, e cada pulso representa uma unidade de medida pré-determinada, como milímetros.</p>
                    <p>Nesse caso, o pulso está calibrado em 0,25 mm. Então, em um exemplo, se ocorrerem 5 pulsos, a quantidade de chuva será igual a <b>0,25mm * 5 = 1,25mm</b>.</p>
                    <p>Agora para obter uma medida mais realista, precisamos converter a medida de mm para L, <b>1mm = 1L/m^2</b></p>
                </div>
            </Container>
        </>
    )
}