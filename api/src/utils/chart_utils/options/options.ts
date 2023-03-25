import Metric from "../metric/metric";

export default class Options {
    chart = { type: "lines", width: 1200, height: 500 };
    title = { text: `Informações meteorológicas da estação` };
    xAxis = { categories: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'] };
    series: Array<Metric>;
    lang = { noData: "Não há dados disponíveis para exibição." };
    noData = { style: { fontWeight: 'bold', fontSize: '24px', color: '#5751D3' } };

    constructor(title: string, series: Array<Metric>) {
        this.title = { text: `Informações meteorológicas da estação ${title}` };
        this.series = series;
    }

    setTitle(station: string) {
        this.title = { text: station };
    }

    setxAxis(categories: Array<string>){
        this.xAxis.categories = categories
    }    

    addSerie(metric: Metric) {
        this.series.push(metric);
    }


}



