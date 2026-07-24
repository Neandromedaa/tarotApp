import type { SpreadType, SpreadPurpose } from '../../../entities/spread/model/types';

export type DayTime = 'morning' | 'afternoon' | 'evening';

export interface DailyCardMeaningParams {
    type: 'dailyCard';
    cardName: string;
    time: DayTime;
}

export interface SpreadMeaningParams {
    type: 'spread';
    spreadType: SpreadType;
    spreadPurpose: SpreadPurpose;
    cardNames: string[];
}

export type MeaningParams = DailyCardMeaningParams | SpreadMeaningParams;

export interface DailyCardMeaning {
    short: string;
}

export interface SpreadMeaning {
    full: string;
    short: string;
}

export type MeaningResult<T extends MeaningParams> = T extends DailyCardMeaningParams
    ? DailyCardMeaning
    : SpreadMeaning;
