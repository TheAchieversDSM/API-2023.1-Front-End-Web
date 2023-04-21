import Metric from "../metric/metric";
import Options from "../options/options";

export default function chartMount(metrics: Array<Metric>, nome: string){
    const opts = new Options(nome,[])
    metrics.forEach(metrica => {
        opts.addSerie(metrica)
    }); 
    console.log(opts)
    return opts
}