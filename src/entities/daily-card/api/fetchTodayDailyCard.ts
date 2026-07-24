import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../shared/api/firebase';
import type { DailyCardDiaryEntry } from '../../diary-entry/model/types';

function startOfToday(): number {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

export async function fetchTodayDailyCard(userId: string): Promise<DailyCardDiaryEntry | null> {
    const queryCard = query(
        collection(db, 'savedReadings'),
        where('userId', '==', userId),
        where('type', '==', 'dailyCard'),
        where('date', '>=', startOfToday()),
        orderBy('date', 'desc'),
        limit(1)
    );
    const snapshot = await getDocs(queryCard);

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as DailyCardDiaryEntry;
}
