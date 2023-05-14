import Metric from "../metric/metric";
import Options from "../options/options";

export default function chartMount(metrics: Array<Metric>, nome: string){
    const opts = new Options(nome,[])
    var categories: any[] = []
    metrics.forEach(metrica => {
        const categ = metrica.data.map(item => item[0])
        categories.push(categ)
        
        opts.addSerie(metrica)
    }); 
    opts.addCategories(categories)
    return opts
}