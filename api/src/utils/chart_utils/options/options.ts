import Metric from "../metric/metric";

interface XAxis {
    type?: string;
    dateTimeLabelFormats?: object;
  }


export default class Options {
    chart = {
        type: "spline",
        width: 900,
        height: 500,
        zoomType: 'x', // Adiciona a opção de zoom no eixo x
        panning: true, // Habilita o panning no eixo x
      };
      xAxis = {categories: [], range: 5 }
      title = { text: `Informações meteorológicas da estação` };
      rangeSelector!: {
        enabled: false
    }
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


    addSerie(metric: Metric) {
        this.series.push(metric);
    }

    addCategories(cat:any){

        this.xAxis.categories = cat[0]
    }


}