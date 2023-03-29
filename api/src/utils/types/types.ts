export type Data = [number, number]

export type Estacao = {
    id: number;
    nome: string;
    lati: number;
    long: number;
    unixtime: number;    
}

export type Medida = {
    valorMedido: string;
    unixtime: number;
}

export type MedidaMedia = {valor: number, timestamp: number}

export type MediasSeries = {media: MedidaMedia, nome:string, sufixo:string}

export type EstacaoParametro = {
    parametro_id: number;
    nome: string;
    unidadeDeMedida: string;
    formula: string;
    fator: number;
    offset: number;
    medidas: Medida[];
    medidaMedia: MedidaMedia;
    
}

