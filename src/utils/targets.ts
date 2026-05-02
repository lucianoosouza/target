export type TargetItem = {
    id: string
    name: string
    percentage: string
    current: string
    target: string
}

export const targets: TargetItem[] = [
    {
        id: '1',
        name: 'Apple Watch',
        percentage: '25%',
        current: 'R$ 580,00',
        target: 'R$ 1.700,00',
    },
    {
        id: '2',
        name: 'Comprar uma cadeira ergonômica',
        percentage: '75%',
        current: 'R$ 900,00',
        target: 'R$ 1.200,00',
    },
    {
        id: '3',
        name: 'Viagem',
        percentage: '40%',
        current: 'R$ 1.200,00',
        target: 'R$ 3.000,00',
    },
]
