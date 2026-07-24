import clsx from 'clsx';
import { PulseLoader } from 'react-spinners';

import DiaryItem from '../../../entities/diary-entry/ui/DiaryItem';
import { useDiaryFeed } from '../model/useDiaryFeed';

import styles from './diaryFeed.module.scss';

function DiaryFeed() {
    const { status, items, hasNextPage, fetchNextPage, error, filter, setFilter } = useDiaryFeed();

    if (status === 'unauthorized') {
        return <div className={styles.emptyState}>Для просмотра дневника необходимо войти в аккаунт</div>;
    }
    if (status === 'loading') {
        return <PulseLoader color="#8b5cf6" size={10} />;
    }
    if (status === 'error') {
        return <div className={styles.error}>Ошибка загрузки: {error?.message}</div>;
    }
    if (status === 'empty') {
        return <div className={styles.emptyState}>Расклады еще не сохранены</div>;
    }

    return (
        <>
            <div className={styles.filterTabs}>
                <button onClick={() => setFilter('all')} className={clsx(styles.button, filter === 'all' && styles.active)}>Все</button>
                <button onClick={() => setFilter('dailyCard')} className={clsx(styles.button, filter === 'dailyCard' && styles.active)}>Карты дня</button>
                <button onClick={() => setFilter('spread')} className={clsx(styles.button, filter === 'spread' && styles.active)}>Расклады</button>
            </div>
            <div className={styles.container}>
                {items.map((item) => (
                    <DiaryItem key={item.id} value={item} />
                ))}
            </div>
            {hasNextPage && (
                <button onClick={() => fetchNextPage()} className={styles.loadMore}>
                    Загрузить ещё
                </button>
            )}
        </>
    );
}

export default DiaryFeed;
