import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';
import styles from './spreadContext.module.scss';

function SpreadContext() {
    const spreadType = useAppSelector((state) => state.tarot.tarotSpreadType);
    const spreadPurpose = useAppSelector((state) => state.tarot.tarotSpreadPurpose);

    if (!spreadType || !spreadPurpose) return null;

    return (
        <div className={styles.spreadContext}>
            {spreadType.name} · {spreadPurpose.name}
        </div>
    );
}

export default SpreadContext;
