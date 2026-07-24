import SpreadOptionsGrid from './SpreadOptionsGrid';
import ReadingRead from './ReadingRead';
import ReadingResult from './ReadingResult';
import Progress from './Progress';
import SpreadContext from './SpreadContext';
import { useInitReadingFlow } from '../model/useInitReadingFlow';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';

import styles from './readingFlow.module.scss';

function ReadingFlow() {
    useInitReadingFlow();
    const currentMode = useAppSelector((state) => state.tarot.mode);

    return (
        <div className={styles.readingMain}>
            {currentMode !== 3 && <Progress step={currentMode} />}
            {currentMode === 2 && <SpreadContext />}
            {(currentMode === 0 || currentMode === 1) && <SpreadOptionsGrid />}
            {currentMode === 2 && <ReadingRead />}
            {currentMode === 3 && <ReadingResult />}
        </div>
    );
}

export default ReadingFlow;
