import { useEffect } from 'react';
import { fetchCards } from '../../../entities/card/model/fetchTarotCardsSlice';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';

export function useInitDailyCard(): void {
    const dispatch = useAppDispatch();
    const cards = useAppSelector((state) => state.cards.items);

    useEffect(() => {
        if (cards.length === 0) dispatch(fetchCards());
    }, []);
}
