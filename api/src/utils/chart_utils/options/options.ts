import Metric from "../metric/metric";

interface XAxis {
    type?: string;
    dateTimeLabelFormats?: object;
  }


export default class Options {
    chart = {
        events: {
            selection: function(event: any) {
              console.log("Usuário fez uma seleção no gráfico:", event);
              // aqui você pode chamar a função que desejar
            }
          },
        type: "spline",
        width: 900,
        height: 500,
        zoomType: 'x', // Adiciona a opção de zoom no eixo x
        panning: true, // Habilita o panning no eixo x
      };
      xAxis = {categories: []}
      title = { text: `Informações meteorológicas da estação` };
    
      series: Array<Metric>;
      lang = { noData: "Não há dados disponíveis para exibição." };
      noData = { style: { fontWeight: 'bold', fontSize: '24px', color: '#5751D3' } };
      rangeSelector = {
        inputEnabled: true,
        buttons: [
          {
            type: 'day',
            count: 1,
            text: '1d'
          },
          {
            type: 'day',
            count: 7,
            text: '1w'
          },
          {
            type: 'month',
            count: 1,
            text: '1m'
          },
          {
            type: 'all',
            text: 'Tudo'
          }
        ],
        selected: 0 // Define o intervalo inicial
      };

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