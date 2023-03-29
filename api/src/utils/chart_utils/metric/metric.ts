import { Data } from "../../types/types";

export default class Metric{
    name: string;
    tooltip!: { valueSuffix: string | ""; }; 
    data: [number,number];

    constructor(name: string, data: [number, number]){
        this.name = name;
        this.data = data;
    }

    setName(name: string){
        this.name = name
    }
    setData(data: [number, number]){
        this.data = data
    }

    setTooltip(sufix: string){
        this.tooltip.valueSuffix = sufix
    }

}