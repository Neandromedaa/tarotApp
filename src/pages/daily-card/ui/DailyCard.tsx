import DailyCardFlow from '../../../widgets/daily-card-flow/ui/DailyCardFlow';
import styles from './dailyCard.module.scss';

function DailyCard() {
    return (
        <div className={styles.dailyCard}>
            <h1 className={styles.title}>Карта дня</h1>
            <DailyCardFlow />
        </div>
    );
}

export default DailyCard;
