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
        zoomType: 'x', 
    };

    xAxis = {
        categories: [], 
        scrollbar: {
            enabled: true,
            height: 10,
            barBackgroundColor: "#5751D3",
            minWidth: 5,
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: "#9894EA",
            trackBorderWidth: 1,
            trackBorderRadius: 2,
            trackBorderBackgroundColor: "#2BF400",
            buttonBackgroundColor: "#5751D3",
            buttonBorderColor: "transparent",
            buttonArrowColor: "#ffff"
        }, 
        range: 5
    }
    title = { text: '' };
    series: Array<Metric>;
    lang = { noData: "Não há dados disponíveis para exibição." };
    noData = { style: { fontWeight: 'bold', fontSize: '24px', color: '#5751D3' } };
    plotOptions = {
        series: {
            cursor: 'pointer',
            events: {
                click: (event: any) => {
                    this.funcao(event)
                }
            }
        }
    }
    funcao: Function


    constructor(title: string, series: Array<Metric>) {
        this.title = { text: `Informações de ${title}` };
        this.series = series;
        this.funcao = (event: any) => { }

    }

    setTitle(station: string) {
        this.title = { text: station };
    }


    addSerie(metric: Metric) {
        this.series.push(metric);
    }

    addCategories(cat: any) {
        this.xAxis.categories = cat[0]
    }

    setFuncao(funcao: Function) {
        this.funcao = funcao
    }




}