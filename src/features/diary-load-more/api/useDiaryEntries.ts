import { useInfiniteQuery } from '@tanstack/react-query';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { fetchDiaryEntries, type DiaryFilter } from '../api/fetchDiaryEntries';

type PageParam = QueryDocumentSnapshot<DocumentData> | null;

export function useDiaryEntries(userId: string | null, filter: DiaryFilter, isRestoring: boolean) {
    const query = useInfiniteQuery({
        enabled: !!userId && !isRestoring,
        queryKey: ['diaryEntries', userId, filter] as const,
        queryFn: ({ pageParam }: { pageParam: PageParam }) =>
            fetchDiaryEntries(userId as string, filter, pageParam),
        initialPageParam: null as PageParam,
        getNextPageParam: (lastPage) => lastPage.lastDoc,
    });

    const items = query.data?.pages.flatMap((page) => page.items) ?? [];

    return { ...query, items };
}
