import type { SpreadType, SpreadPurpose } from '../../../entities/spread/model/types';
import type { TarotCard } from '../../../entities/card/model/types';

export type ReadingMode = 0 | 1 | 2 | 3;

export const READING_MODE_LABELS: Record<ReadingMode, string> = {
    0: 'type',
    1: 'purpose',
    2: 'cards',
    3: 'result',
};

export interface ReadingSessionState {
    tarotSpreadType: SpreadType | null;
    tarotSpreadPurpose: SpreadPurpose | null;
    cardsArray: TarotCard[];
    mode: ReadingMode;
}
