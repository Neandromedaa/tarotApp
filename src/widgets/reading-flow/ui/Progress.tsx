import clsx from 'clsx';
import styles from './progress.module.scss';

const STAGES_COUNT = 3;

interface ProgressProps {
    step: number;
}

function Progress({ step }: ProgressProps) {
    return (
        <div className={styles.progress}>
            {Array.from({ length: STAGES_COUNT }).map((_, index) => (
                <span key={index} className={clsx(styles.dot, index <= step && styles.dot_active)} />
            ))}
        </div>
    );
}

export default Progress;
