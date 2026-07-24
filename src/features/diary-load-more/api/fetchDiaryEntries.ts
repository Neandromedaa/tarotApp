import {
    collection,
    getDocs,
    limit,
    query,
    where,
    orderBy,
    startAfter,
    QueryConstraint,
    QueryDocumentSnapshot,
    type DocumentData,
} from 'firebase/firestore';
import { db } from '../../../shared/api/firebase';
import type { DiaryEntry } from '../../../entities/diary-entry/model/types';

export type DiaryFilter = 'all' | 'spread' | 'dailyCard';

interface FetchDiaryEntriesResult {
    items: DiaryEntry[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}

export async function fetchDiaryEntries(
    userId: string,
    filter: DiaryFilter,
    pageParam: QueryDocumentSnapshot<DocumentData> | null
): Promise<FetchDiaryEntriesResult> {
    const constraints: QueryConstraint[] = [where('userId', '==', userId)];

    if (filter !== 'all') {
        constraints.push(where('type', '==', filter));
    }

    constraints.push(orderBy('date', 'desc'), limit(5));

    if (pageParam) constraints.push(startAfter(pageParam));

    const queryRecord = query(collection(db, 'savedReadings'), ...constraints);
    const snapshot = await getDocs(queryRecord);

    return {
        items: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as DiaryEntry),
        lastDoc: snapshot.docs.length ? snapshot.docs[snapshot.docs.length - 1] : null,
    };
}
