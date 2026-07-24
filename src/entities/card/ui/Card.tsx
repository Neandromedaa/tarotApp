import clsx from 'clsx';
import { AdvancedImage } from '@cloudinary/react';
import { useState } from 'react';

import { useCloudinaryImage } from '../../../shared/lib/hooks/useCloudinaryImage';
import type { TarotCard } from '../model/types';

import styles from './card.module.scss';

const commonCardSrc = 'src/shared/assets/images/commonCard.jpg';

interface CardProps {
    item: TarotCard;
    dailyTitle?: boolean;
}

function Card({ item, dailyTitle = false }: CardProps) {
    const cldImg = useCloudinaryImage(item.id);
    const [useFallback, setUseFallback] = useState(false);

    return (
        <div className={styles.card_wrapper}>
            <div className={clsx(styles.cardTitle, dailyTitle && styles.dailyTitle)}>{item.name}</div>
            <div className={styles.card}>
                {useFallback ? (
                    <img src={commonCardSrc} className={styles.cardCloud} />
                ) : (
                    <AdvancedImage
                        cldImg={cldImg}
                        className={styles.cardCloud}
                        onError={ () => setUseFallback(true) }
                    />
                )}
            </div>
        </div>
    );
}

export default Card;
