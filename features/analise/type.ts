export interface MesAgregado {
    ano: number;
    mes: number;
    rotuloCurto: string;
    entradas: number;
    saidas: number;
    saldo: number;
}

export interface EvolutionChartProps {
    meses: MesAgregado[];
}

export interface PontoEvolucaoChart {
    id: string;
    rotulo: string;
    entradas: number;
    saidas: number;
    saldo: number;
    isAtual: boolean;
}

export interface TooltipPayloadItem {
    payload?: PontoEvolucaoChart;
}