import { ToastContainer } from "react-toastify";
import Sidebar from "../components/sidebar";
import "../styles/documentacao.css"

export default function DocAlerta(){
    return(
        <>
            <Sidebar />
            <h1 className="TitImp">Alertas</h1>
            <div className="box-doc">
                <p className="doc-txt">Os alertas de Atenção, Perigo e Crítico são importantes classificações utilizadas para alertar a população sobre as condições meteorológicas adversas que podem ocorrer em determinada região</p>
                <p className="doc-txt txt1"><b>Alerta de Atenção</b> é emitido quando há possibilidade de ocorrência de condições meteorológicas adversas, como chuvas intensas ou ventos fortes, que podem causar impactos pontuais.</p>
                <p className="doc-txt txt2"><b>Alerta de Perigo</b> indica a possibilidade de ocorrência de fenômenos meteorológicos mais intensos e duradouros, como tempestades, inundações e deslizamentos de terra, que podem causar danos significativos à infraestrutura e à população.</p>
                <p className="doc-txt txt3"><b>Alerta Crítico</b> é emitido quando as condições meteorológicas atingem níveis extremos e apresentam risco iminente à vida das pessoas, como furacões, ciclones e tornados.</p>
            </div>
        </>
    )
}