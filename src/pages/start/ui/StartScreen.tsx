import { useEffect } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import { useAuth } from '../../../features/auth/model/useAuth';
import { ROUTES } from '../../../shared/config/routes';

import styles from './startScreen.module.scss';

function StartScreen() {
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated, login, signup, continueAsGuest } = useAuth();

    useEffect(() => {
        if (isAuthenticated) navigate(ROUTES.MENU);
    }, [isAuthenticated, navigate]);

    function handleGuest(): void {
        continueAsGuest();
        navigate(ROUTES.MENU);
    }

    if (isLoading) {
        return (
            <div className={styles.startScreen}>
                <PulseLoader color="#8b5cf6" size={10} />
            </div>
        );
    }

    return (
        <div className={styles.startScreen}>
            <div className={styles.glowOrb} />

            <div className={styles.content}>
                <h1 className={styles.appTitle}>Таро Гадание</h1>

                <p className={styles.description}>
                    Откройте тайны будущего через древнее искусство таро.
                    Каждый расклад — это путь к самопознанию и пониманию настоящего момента.
                </p>

                <div className={styles.buttonGroup}>
                    <button onClick={signup} className={styles.button}>Создать аккаунт</button>
                    <button onClick={login} className={styles.button}>Войти</button>
                    <button onClick={handleGuest} className={clsx(styles.button, styles.guestButton)}>
                        Гость
                    </button>
                </div>

                {error && <p className={styles.error}>Ошибка: {error.message}</p>}
            </div>
        </div>
    );
}

export default StartScreen;
