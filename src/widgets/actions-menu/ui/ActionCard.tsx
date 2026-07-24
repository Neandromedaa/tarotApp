import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../shared/config/routes';

import styles from './actionsMenu.module.scss';

type ActionType = 'reading' | 'dailyCard' | 'diary';

interface ActionOption {
    icon: string;
    title: string;
    subtitle: string;
    link: string;
}

const CARD_OPTIONS: Record<ActionType, ActionOption> = {
    reading: {
        icon: '🔮',
        title: 'Гадание',
        subtitle: 'Расклад таро',
        link: ROUTES.READING,
    },
    dailyCard: {
        icon: '✨',
        title: 'Карта дня',
        subtitle: 'Ежедневное предсказание',
        link: ROUTES.DAILY_CARD,
    },
    diary: {
        icon: '📖',
        title: 'Дневник',
        subtitle: 'История',
        link: ROUTES.DIARY,
    },
};

interface ActionCardProps {
    action: ActionType;
}

function ActionCard({ action }: ActionCardProps) {
    const { icon, title, subtitle, link } = CARD_OPTIONS[action];

    return (
        <NavLink
            to={link}
            className={({ isActive }) => `${styles.actionCard} ${isActive ? styles.active : ''}`}>
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{subtitle}</p>
        </NavLink>
    );
}

export default ActionCard;
