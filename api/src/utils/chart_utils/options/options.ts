import Metric from "../metric/metric";

export default class Options {
    chart = { type: "spline", width: 1200, height: 500 };
    title = { text: `Informações meteorológicas da estação` };
    xAxis= {
        type: 'datetime',
        labels: {
          formatter: function(this: { value?: number }) {
            if (this.value !== undefined) {
              return new Date(this.value).toLocaleString();
            }
            return '';
          }
        }
      };
    series: Array<Metric>;
    lang = { noData: "Não há dados disponíveis para exibição." };
    noData = { style: { fontWeight: 'bold', fontSize: '24px', color: '#5751D3' } };

    constructor(title: string, series: Array<Metric>) {
        this.title = { text: `Informações meteorológicas da estação ${title}` };
        this.series = series;
        this.xAxis = {
            type: 'datetime',
            labels: {
              formatter: function(this: { value?: number }) {
                if (this.value !== undefined) {
                  return new Date(this.value).toLocaleString();
                }
                return '';
              }
            }
          }
    }

    setTitle(station: string) {
        this.title = { text: station };
    }


    addSerie(metric: Metric) {
        this.series.push(metric);
    }


}



