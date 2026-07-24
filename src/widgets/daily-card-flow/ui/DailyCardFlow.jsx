import { useDailyCard } from '../model/useDailyCard';
import { useInitDailyCard } from '../model/useInitDailyCard';
import Card from '../../../entities/card/ui/Card';
import LoadingFlares from '../../../shared/ui/LoadingFlares';

import styles from './dailyCardFlow.module.scss';

function DailyCardFlow() {
    useInitDailyCard();
    const { phase, card, meaning, errorMessage, pickCard, onFlaresExitComplete, goToMenu } = useDailyCard();

    if (phase === 'checking') return null;

    return (
        <div className={styles.dailyCardFlow}>
            {(phase === 'idle' || phase === 'loading' || phase === 'revealing') && (
            <div className={styles.largeFlares}>
                <LoadingFlares
                    resultIsReady={phase === 'revealing'}
                    onExitComplete={onFlaresExitComplete}
                />
            </div>
                
            )}

            {phase === 'idle' && (
                <button className={styles.button} onClick={pickCard}>
                    Карта дня
                </button>
            )}

            {phase === 'result' && card && (
                <div className={styles.result}>
                    <Card item={card} dailyTitle={true}/>
                    {meaning?.short && <p className={styles.resultText}>{meaning.short}</p>}
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    <p className={styles.hint}>Следующая карта дня будет доступна завтра</p>
                    <button className={styles.button} onClick={goToMenu}>
                        Вернуться в меню
                    </button>
                </div>
            )}
        </div>
    );
}

export default DailyCardFlow;
