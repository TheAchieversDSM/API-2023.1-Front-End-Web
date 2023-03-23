export type Data = [number, number]

export type Estacao = {
    id: number;
    nome: string;
    lati: number;
    long: number;
    unixtime: number;    
}

export type EstacaoParametro = {
    id: number;
    nome: string;
    unidadeDeMedida: string;
}

export type Medida = {

}