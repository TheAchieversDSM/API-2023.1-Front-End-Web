export default class Options {
    constructor(chart, title, xAxis, series){
        this.chart = chart = {type: "lines"};
        this.title = title = {text: `Informações meteorológicas da estação ${title}`}
        this.xAxis = xAxis = {categories: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]}
        this.series = series = []
    }
}



