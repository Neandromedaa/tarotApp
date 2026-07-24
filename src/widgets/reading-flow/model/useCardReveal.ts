import { useEffect, useState } from 'react';
import { setCardsArray } from '../../../features/reading-session/model/readingSlice';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';
import type { TarotCard } from '../../../entities/card/model/types';

function shuffle(cards: TarotCard[], count: number): TarotCard[] {
    const temp = [...cards];
    for (let i = temp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp.slice(0, count);
}

export function useCardReveal() {
    const dispatch = useAppDispatch();
    const currentSpreadType = useAppSelector((state) => state.tarot.tarotSpreadType);
    const cards = useAppSelector((state) => state.cards.items);
    const randomCards = useAppSelector((state) => state.tarot.cardsArray);

    const cardsCount = currentSpreadType?.cardsCount ?? 0;

    const [isCardsPlaced, setIsCardsPlaced] = useState(false);
    const [cardsRevealed, setCardsRevealed] = useState(0);
    const [isPlaceholderAvailable, setPlaceholder] = useState<boolean[]>(Array(cardsCount).fill(true));

    useEffect(() => {
        dispatch(setCardsArray(shuffle(cards, cardsCount)));
    }, []);

    function revealNextCard(): void {
        if (!isPlaceholderAvailable.some(Boolean)) return;

        setCardsRevealed((prev) => prev + 1);

        if (cardsRevealed === cardsCount - 1) {
            setIsCardsPlaced(true);
        }

        setPlaceholder((prev) => {
            const idx = prev.findIndex(Boolean);
            if (idx === -1) return prev;
            const next = [...prev];
            next[idx] = false;
            return next;
        });
    }

    return { randomCards, isPlaceholderAvailable, isCardsPlaced, revealNextCard };
}
