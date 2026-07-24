import ReadingFlow from '../../../widgets/reading-flow/ui/ReadingFlow';

import styles from './reading.module.scss';

function Reading() {
    return (
        <div className={styles.reading}>
            <h1 className={styles.title}>Гадание</h1>
            <ReadingFlow />
        </div>
    );
}

export default Reading;
