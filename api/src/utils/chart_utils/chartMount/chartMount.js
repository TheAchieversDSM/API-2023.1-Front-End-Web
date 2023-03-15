import Options from "../options/options";

export default function chartMount(metrics){
    var opts = Options
    metrics.forEach(metrica => {
        opts.series.push(metrica)
    }); 
    return opts
}