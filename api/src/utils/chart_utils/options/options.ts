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

      xAxis = {categories: []}
      title = { text: '' };
      rangeSelector!: {
        selected: 1,
        inputDateFormat: '%Y-%d-%m',
        inputEditDateFormat: '%Y-%d-%m'
    }
      series: Array<Metric>;
      lang = { noData: "Não há dados disponíveis para exibição." };
      noData = { style: { fontWeight: 'bold', fontSize: '24px', color: '#5751D3' } };
      plotOptions = {
        series: {
            cursor: 'pointer',
            events: {
                click: (event: any) => 
                {
                    this.funcao(event)
                }
            }
        }
    }
    funcao: Function


    constructor(title: string, series: Array<Metric>) {
        this.title = { text: `Informações de ${title}` };
        this.series = series;
        this.funcao = (event: any)=>{}

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

    setFuncao(funcao: Function){
        this.funcao = funcao
    }


  

}