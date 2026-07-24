import { useEffect } from 'react';
import { resetSavedReadings } from '../../../features/reading-session/model/readingSlice';
import { fetchSpreadTypes } from '../../../entities/spread/model/fetchTarotSpreadTypesSlice';
import { fetchSpreadPurposes } from '../../../entities/spread/model/fetchTarotSpreadPurposesSlice';
import { fetchCards } from '../../../entities/card/model/fetchTarotCardsSlice';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';

export function useInitReadingFlow(): void {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetSavedReadings());
        dispatch(fetchSpreadTypes());
        dispatch(fetchSpreadPurposes());
        dispatch(fetchCards());

        return () => {
            dispatch(resetSavedReadings());
        };
    }, [dispatch]);
}
