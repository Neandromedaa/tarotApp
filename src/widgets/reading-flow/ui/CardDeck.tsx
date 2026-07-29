import clsx from 'clsx';
import { AdvancedImage } from '@cloudinary/react';

import { useCloudinaryImage } from '../../../shared/lib/hooks/useCloudinaryImage';

import styles from './cardDeck.module.scss';

interface CardDeckProps {
    isCardsPlaced: boolean;
    onClick: () => void;
}

function CardDeck({ isCardsPlaced, onClick }: CardDeckProps) {
    const backImg = useCloudinaryImage('X7mNpLqRsTvW2yZbC4fA');

    return (
        <>
            <div
                onClick={() => !isCardsPlaced && onClick()}
                className={clsx(styles.cardDeck)}
                style={{ cursor: isCardsPlaced ? 'default' : 'pointer' }}>
                <AdvancedImage cldImg={backImg} className={styles.cardCloud}/>
            </div>
            {!isCardsPlaced && <p className={styles.hint}>Нажмите на колоду, чтобы открыть карту</p>}
        </>
    );
}

export default CardDeck;
