import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useQueryClient } from '@tanstack/react-query';
import Cerebras from '@cerebras/cerebras_cloud_sdk';

import { generateTarotMeaning } from '../../../features/generate-tarot-meaning/api/generate-tarot-meaning';
import { saveDiaryEntry } from '../../../features/save-diary-entry/api/saveDiaryEntry';
import { resetSavedReadings } from '../../../features/reading-session/model/readingSlice';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';
import { MOCK_SPREAD_MEANING } from '../../../features/generate-tarot-meaning/lib/mockMeaning';
import { ROUTES } from '../../../shared/config/routes';
import type { SpreadMeaning } from '../../../features/generate-tarot-meaning/model/types';

export default function useReadingResult() {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAuth0();
    const hasFetchedRef = useRef(false);

    const spreadType = useAppSelector((state) => state.tarot.tarotSpreadType);
    const spreadPurpose = useAppSelector((state) => state.tarot.tarotSpreadPurpose);
    const cards = useAppSelector((state) => state.tarot.cardsArray);
    const cardNames = cards.map((item) => item.name);

    const [result, setResult] = useState<SpreadMeaning | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isReady, setIsReady] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        if (!spreadType || !spreadPurpose) return;

        async function run() {
            if (import.meta.env.VITE_DEBUG_MODE === 'true') {
                setResult(MOCK_SPREAD_MEANING);
                setIsReady(true);
                return;
            }

            try {
                const parsed = await generateTarotMeaning({
                    type: 'spread',
                    spreadType: spreadType!,
                    spreadPurpose: spreadPurpose!,
                    cardNames,
                });
                setResult(parsed);
            } catch (err) {
                if (err instanceof Cerebras.APIError) {
                    setErrorMessage(
                        err.status === 429
                            ? 'Таролог занят. Попробуйте повторить запрос через пару минут.'
                            : 'Произошла ошибка при обработке расклада. Попробуйте повторить запрос позже.'
                    );
                } else {
                    setErrorMessage('Не удалось связаться с сервером. Проверьте подключение и попробуйте снова.');
                }
            } finally {
                setIsReady(true);
            }
        }

        run();
    }, []);

    useEffect(() => {
        if (!isReady || !result || !user?.sub || !spreadType || !spreadPurpose) return;

        const newEntry = {
            userId: user.sub,
            type: 'spread' as const,
            cards: cardNames,
            spreadType: spreadType.name,
            spreadPurpose: spreadPurpose.name,
            shortResult: result.short,
        };

        saveDiaryEntry(newEntry)
            .then(() => {
                queryClient.setQueriesData(
                    {
                        predicate: (query) => {
                            const [key, qUserId, qFilter] = query.queryKey as [string, string, string];
                            return key === 'diaryEntries' && qUserId === user.sub && (qFilter === 'all' || qFilter === 'spread');
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
            .catch((err) => console.error('Failed to save diary entry:', err));
    }, [isReady, result]);

    function goToMenu(): void {
        dispatch(resetSavedReadings());
        navigate(ROUTES.MENU);
    }

    return { result, errorMessage, isReady, showResult, setShowResult, goToMenu };
}
