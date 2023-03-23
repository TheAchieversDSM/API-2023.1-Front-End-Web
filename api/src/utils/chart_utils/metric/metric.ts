import { Data } from "../../types/types";

export default class Metric{
    name: string;
    tooltip: {valueSuffix: string}
    data: Array<Data>;

    constructor(name: string, data: Array<Data>, tooltip:{valueSuffix: string}){
        this.name = name;
        this.data = data;
        this.tooltip = tooltip
    }

    setName(name: string){
        this.name = name
    }
    setData(data: Array<Data>){
        this.data = data
    }

    setTooltip(sufix: string){
        this.tooltip.valueSuffix = sufix
    }

}