import { useNavigate } from 'react-router-dom';

import DiaryFeed from '../../../widgets/diary-feed/ui/DiaryFeed';
import { ROUTES } from '../../../shared/config/routes';

import styles from './diary.module.scss';

function Diary() {
    const navigate = useNavigate();

    function goToMenu(): void {
        navigate(ROUTES.MENU);
    }

    return (
        <div className={styles.diary}>
            <h1 className={styles.title}>Дневник раскладов</h1>
            <DiaryFeed />
            <button onClick={goToMenu} className={styles.button}>
                Вернуться в меню
            </button>
        </div>
    );
}

export default Diary;
