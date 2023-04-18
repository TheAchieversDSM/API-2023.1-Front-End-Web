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
    unixtime: string;
}

export interface MedidasAgrupadas {
    [unixtime: string]: Medida[];
  }

export type MedidaMedia = Medida[]

export type MediasSeries = {media: MedidaMedia, nome:string, sufixo:{nome:string, id:number}}

export type EstacaoParametro = {
    parametro_id: number;
    nome: string;
    unidadeDeMedida: {nome:string, unidade_id:number};
    formula: string;
    fator: number;
    offset: number;
    medidas: Medida[];
    medidaMedia: MedidaMedia;
    
}
