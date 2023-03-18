export default class Metric{
    name: string;
    data: Array<any>;

    constructor(name: string, data: Array<any>){
        this.name = name;
        this.data = data;
    }

    setName(name: string){
        this.name = name
    }
    setData(data: Array<any>){
        this.data = data
    }
}