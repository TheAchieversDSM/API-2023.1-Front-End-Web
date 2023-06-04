export default function obterUnixtimeDia(data?: Date) {
    const dataAtual = data ? new Date(2023, 4, 14) : new Date();
    const dataDesejada = new Date(2023, 4, 14);
    const inicioDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate(), 0, 0, 0);
    const startOf = Math.floor(inicioDia.getTime() / 1000);

    const finalDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate(), 23, 59, 59);
    const endOf = Math.floor(finalDia.getTime() / 1000);
    
    return { startOf, endOf };
  }
  