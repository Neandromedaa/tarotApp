import useReadingResult from '../model/useReadingResult';
import LoadingFlares from '../../../shared/ui/LoadingFlares';

import styles from './readingResult.module.scss';

function ReadingResult() {
    const { result, errorMessage, isReady, showResult, setShowResult, goToMenu } = useReadingResult();

    return (
        <>
            <div className={styles.readingResult}>
                {showResult ? (
                    <p className={styles.resultText}>{result?.full || errorMessage}</p>
                ) : (
                    <LoadingFlares resultIsReady={isReady} onExitComplete={() => setShowResult(true)} />
                )}
            </div>
            {showResult && (
                <button onClick={goToMenu} className={styles.button}>
                    Вернуться в меню
                </button>
            )}
        </>
    );
}

export default ReadingResult;
