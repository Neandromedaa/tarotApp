export interface SpreadType {
    id: string;
    name: string;
    description: string;
    cardsCount: number;
}

export interface SpreadPurpose {
    id: string;
    name: string;
    description: string;
}

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type SpreadOption = SpreadType | SpreadPurpose;
