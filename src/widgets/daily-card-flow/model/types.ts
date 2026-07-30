import type { TarotCard } from '../../../entities/card/model/types';
import type { DailyCardMeaning } from '../../../features/generate-tarot-meaning/model/types';

export type DailyCardPhase = 'checking' | 'idle' | 'loading' | 'revealing' | 'result' | 'error';

export interface GuestDailyCardStorage {
    card: TarotCard;
    meaning: DailyCardMeaning;
}
