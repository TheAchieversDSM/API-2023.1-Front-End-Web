import Metric from "../metric/metric";

export default class Options {
    chart = {type: "lines"};
    title = {text: `Informações meteorológicas da estação`};
    xAxis = {categories: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]};
    series: Array<Metric>;

    constructor(title: string, series: Array<Metric>){
        this.title = {text: `Informações meteorológicas da estação ${title}`};
        this.series = series;
    }

    setTitle(station: string){
        this.title = {text: station};
    }

    addSerie(metric: Metric){
        this.series.push(metric);
    }


}



