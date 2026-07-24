import { useState } from 'react';
import { useIsRestoring } from '@tanstack/react-query';
import { useDiaryEntries } from '../../../features/diary-load-more/api/useDiaryEntries';
import { useAuth } from '../../../features/auth/model/useAuth';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';
import type { DiaryFilter, DiaryFeedStatus } from './types';

export function useDiaryFeed() {
    const userId = useAppSelector((state) => state.userId.userId);
    const { isLoading: isAuthLoading } = useAuth();

    const [filter, setFilter] = useState<DiaryFilter>('all');
    const isRestoring = useIsRestoring();
    const { items, fetchNextPage, hasNextPage, isLoading, isError, error } = useDiaryEntries(userId, filter, isRestoring);

    const status: DiaryFeedStatus = isAuthLoading
        ? 'loading'
        : !userId
        ? 'unauthorized'
        : isRestoring || isLoading
        ? 'loading'
        : isError
        ? 'error'
        : items.length === 0
        ? 'empty'
        : 'ready';

    return { status, items, hasNextPage, fetchNextPage, error, filter, setFilter };
}
