import { Data } from "../../types/types";
var randomColor = require('randomcolor'); // import the script



export default class Metric{
    name: string;
    tooltip: { valueSuffix: string; } = { valueSuffix: '' }; 
    data: number[][];
    color= randomColor({
        luminosity: 'dark'
     });
     

    constructor(name: string, data: number[][]){
        this.name = name;
        this.data = data;
    }

    setName(name: string){
        this.name = name
    }
    setData(data: number[][]){
        this.data = data
    }

    setTooltip(sufix: string){
        this.tooltip.valueSuffix = sufix
    }

}