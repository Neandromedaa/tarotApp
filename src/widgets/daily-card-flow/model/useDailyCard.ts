// widgets/daily-card-flow/model/useDailyCard.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';


import { fetchCards } from '../../../entities/card/model/fetchTarotCardsSlice';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { fetchTodayDailyCard } from '../../../entities/daily-card/api/fetchTodayDailyCard';
import { saveDiaryEntry } from '../../../features/save-diary-entry/api/saveDiaryEntry';
import { generateTarotMeaning } from '../../../features/generate-tarot-meaning/api/generate-tarot-meaning';
import { ROUTES } from '../../../shared/config/routes';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';
import type { TarotCard } from '../../../entities/card/model/types';
import type { DailyCardMeaning } from '../../../features/generate-tarot-meaning/model/types';
import type { DailyCardPhase, GuestDailyCardStorage } from './types';
import { getDayTime } from '../lib/getDayTime';

const GUEST_KEY_PREFIX = 'dailyCard:';

function todayKey(): string {
    return new Date().toISOString().slice(0, 10);
}

export function useDailyCard() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.userId.userId);
    const cards = useAppSelector((state) => state.cards.items);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [phase, setPhase] = useState<DailyCardPhase>('checking');
    const [card, setCard] = useState<TarotCard | null>(null);
    const [meaning, setMeaning] = useState<DailyCardMeaning | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        async function checkExisting() {
            if (userId) {
                const existing = await fetchTodayDailyCard(userId);
                if (existing) {
                    setCard({ id: existing.cardId, name: existing.cardName });
                    setMeaning({ short: existing.shortResult });
                    setPhase('result');
                    return;
                }
            } else {
                const raw = localStorage.getItem(GUEST_KEY_PREFIX + todayKey());
                if (raw) {
                    const saved = JSON.parse(raw) as GuestDailyCardStorage;
                    setCard(saved.card);
                    setMeaning(saved.meaning);
                    setPhase('result');
                    return;
                }
            }
            setPhase('idle');
        }
        checkExisting();
    }, [userId]);

    async function pickCard(): Promise<void> {
        setPhase('loading');

        let availableCards = cards;
        if (availableCards.length === 0) {
            availableCards = await dispatch(fetchCards()).unwrap();
        }

        const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
        setCard(randomCard);

        const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 2000));
        const meaningPromise = generateTarotMeaning({
            type: 'dailyCard',
            cardName: randomCard.name,
            time: getDayTime(),
        }).catch(() => {
            setErrorMessage('Не удалось получить толкование. Попробуйте позже.');
            return null;
        });

        const [, result] = await Promise.all([minDelay, meaningPromise]);

        if (!result) {
            setPhase('error');
            return;
        }

        setMeaning(result);
        setPhase('revealing');

        if (!result) return;

        if (userId) {
            const newEntry = {
                userId,
                type: 'dailyCard' as const,
                cardId: randomCard.id,
                cardName: randomCard.name,
                shortResult: result.short,
            };

            saveDiaryEntry(newEntry)
                .then(() => {
                    queryClient.setQueriesData(
                        {
                            predicate: (query) => {
                                const [key, qUserId, qFilter] = query.queryKey as [string, string, string];
                                return key === 'diaryEntries' && qUserId === userId && (qFilter === 'all' || qFilter === 'dailyCard');
                            },
                        },
                        (oldData: any) => {
                            if (!oldData) return oldData;
                            const [firstPage, ...restPages] = oldData.pages;
                            return {
                                ...oldData,
                                pages: [
                                    { ...firstPage, items: [{ id: 'temp-' + Date.now(), date: Date.now(), ...newEntry }, ...firstPage.items] },
                                    ...restPages,
                                ],
                            };
                        }
                    );
                })
                .catch((err) => console.error('Failed to save daily card:', err));
        } else {
            const storage: GuestDailyCardStorage = { card: randomCard, meaning: result };
            localStorage.setItem(GUEST_KEY_PREFIX + todayKey(), JSON.stringify(storage));
        }
    }

    function onFlaresExitComplete(): void {
        setPhase('result');
    }

    function goToMenu(): void {
        navigate(ROUTES.MENU);
    }

    return { phase, card, meaning, errorMessage, pickCard, onFlaresExitComplete, goToMenu };
}
