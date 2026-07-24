import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../shared/api/firebase';
import type { SpreadDiaryEntry, DailyCardDiaryEntry } from '../../../entities/diary-entry/model/types';

export type SaveDiaryEntryParams =
    | Omit<SpreadDiaryEntry, 'id' | 'date'>
    | Omit<DailyCardDiaryEntry, 'id' | 'date'>;

export async function saveDiaryEntry(params: SaveDiaryEntryParams): Promise<void> {
    if (!params.userId) return;

    const base = { userId: params.userId, type: params.type, date: Date.now() };

    const payload =
        params.type === 'dailyCard'
            ? { ...base, cardName: params.cardName, shortResult: params.shortResult }
            : { ...base, cards: params.cards, spreadType: params.spreadType, spreadPurpose: params.spreadPurpose, shortResult: params.shortResult };

    await setDoc(doc(collection(db, 'savedReadings')), payload);
}
