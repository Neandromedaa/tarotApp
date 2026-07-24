import ActionCard from './ActionCard';
import { useAuth } from '../../../features/auth/model/useAuth';
import { useGreeting } from '../model/useGreeting';

import styles from './actionsMenu.module.scss';

interface ActionsMenuProps {
    isGuest: boolean;
}

function ActionsMenu({ isGuest }: ActionsMenuProps) {
    const { dayOfWeek, date, month, userName, greeting } = useGreeting();
    const { login, logout } = useAuth();

    return (
        <div className={styles.actionsMenu}>
            <div className={styles.topBar}>
                {isGuest ? (
                    <button onClick={login} className={styles.loginButton}>
                        Войти
                    </button>
                ) : (
                    <button onClick={logout} className={styles.logoutButton}>
                        Выход
                    </button>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <p className={styles.dayOfWeek}>{dayOfWeek}, {date} {month}</p>
                    <h2 className={styles.greeting}>{greeting}, {userName}</h2>
                </div>

                {isGuest ? (
                    <div className={styles.actionsGridFull}>
                        <ActionCard action="reading" />
                        <ActionCard action="dailyCard" />
                    </div>
                ) : (
                    <div className={styles.actionsGridFull}>
                        <ActionCard action="reading" />
                        <div className={styles.actionsGridSecondary}>
                            <ActionCard action="dailyCard" />
                            <ActionCard action="diary" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ActionsMenu;
