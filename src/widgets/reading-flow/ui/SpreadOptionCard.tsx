import clsx from 'clsx';
import type { SpreadOption } from '../../../entities/spread/model/types';
import styles from './spreadOptionCard.module.scss';

interface SpreadOptionCardProps {
    item: SpreadOption;
    isSelected: boolean;
    onClick: (item: SpreadOption) => void;
}

function SpreadOptionCard({ item, isSelected, onClick }: SpreadOptionCardProps) {
    return (
        <button
            className={clsx(styles.optionCard, isSelected && styles.optionCard_selected)}
            onClick={() => onClick(item)}>
            <span className={styles.optionName}>{item.name}</span>
        </button>
    );
}

export default SpreadOptionCard;
