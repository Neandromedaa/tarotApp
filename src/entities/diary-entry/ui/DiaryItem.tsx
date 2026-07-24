import type { DiaryEntry } from '../model/types';
import styles from './diaryItem.module.scss';

interface DiaryItemProps {
    value: DiaryEntry;
}

function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

function DiaryItem({ value }: DiaryItemProps) {
    if (value.type === 'dailyCard') {
        return (
            <div className={styles.item}>
                <div className={styles.cardBackground} style={{ backgroundImage: 'none' }} />
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.spreadInfo}>
                            <span className={styles.label}>Карта дня</span>
                            <p className={styles.text}>{value.cardName}</p>
                        </div>
                        <span className={styles.date}>{formatDate(value.date)}</span>
                    </div>
                    <div className={styles.result}>
                        <span className={styles.label}>Значение</span>
                        <p className={styles.text}>{value.shortResult}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.item}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.spreadInfo}>
                        <span className={styles.label}>Тип расклада</span>
                        <p className={styles.text}>{value.spreadType}</p>
                    </div>
                    <span className={styles.date}>{formatDate(value.date)}</span>
                </div>

                <div className={styles.purpose}>
                    <span className={styles.label}>На что расклад</span>
                    <p className={styles.text}>{value.spreadPurpose}</p>
                </div>

                <div className={styles.result}>
                    <span className={styles.label}>Результат</span>
                    <p className={styles.text}>{value.shortResult}</p>
                </div>

                <div className={styles.cards}>
                    <span className={styles.label}>Карты</span>
                    <p className={styles.text}>{value.cards.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}

export default DiaryItem;
