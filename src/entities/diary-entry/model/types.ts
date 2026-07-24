interface DiaryEntryBase {
    id: string;
    userId: string;
    date: number;
}

export interface SpreadDiaryEntry extends DiaryEntryBase {
    type: 'spread';
    cards: string[];
    spreadType: string;
    spreadPurpose: string;
    shortResult: string;
}

export interface DailyCardDiaryEntry extends DiaryEntryBase {
    type: 'dailyCard';
    cardId: string;
    cardName: string;
    shortResult: string;
}

export type DiaryEntry = SpreadDiaryEntry | DailyCardDiaryEntry;
