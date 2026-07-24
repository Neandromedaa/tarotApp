import { useState } from 'react';
import clsx from 'clsx';

import { setMode } from '../../../features/reading-session/model/readingSlice';
import { useCardReveal } from '../model/useCardReveal';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';
import CardDeck from './CardDeck';
import CardPlaceholder from '../../../entities/card/ui/CardPlaceholder';
import Card from '../../../entities/card/ui/Card';
import type { ReadingMode } from '../../../features/reading-session/model/types';

import styles from './readingRead.module.scss';

function ReadingRead() {
    const dispatch = useAppDispatch();
    const currentMode = useAppSelector((state) => state.tarot.mode);
    const { randomCards, isPlaceholderAvailable, isCardsPlaced, revealNextCard } = useCardReveal();
    const [isLeaving, setIsLeaving] = useState(false);

    function clickResult(): void {
        setIsLeaving(true);
        setTimeout(() => {
            dispatch(setMode((currentMode + 1) as ReadingMode));
        }, 250);
    }

    return (
        <div className={clsx(styles.readingRead, isLeaving && styles.readingRead_leaving)}>
            <div className={clsx(styles.readingPlaceholders, isCardsPlaced && styles.readingPlaceholders_shifted)}>
                {randomCards.map((item, index) =>
                    isPlaceholderAvailable[index] ? <CardPlaceholder key={item.id} /> : <Card key={item.id} item={item} />
                )}
            </div>
            {!isCardsPlaced ? (
                <CardDeck isCardsPlaced={isCardsPlaced} onClick={revealNextCard} />
            ) : (
                <div className={styles.resButton_container_show}>
                    <button className={styles.resButton_show} onClick={clickResult}>
                        Узнать значение
                    </button>
                </div>
            )}
        </div>
    );
}

export default ReadingRead;
