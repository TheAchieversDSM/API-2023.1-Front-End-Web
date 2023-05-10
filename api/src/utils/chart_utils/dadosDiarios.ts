import { Medida } from "../types/types"

export default function dadosDiarios(medidas: Medida[], unixtime: string): Medida[]{
    var dadosD: Medida[] = []
    unixtime = unixtime.split("-")[2]
    medidas.map((med: any) => {
            const unix =  med.unixtime.split("/")
            if(unix[0] == unixtime){
                dadosD.push(med)
            }
      })
      return(dadosD)
}   