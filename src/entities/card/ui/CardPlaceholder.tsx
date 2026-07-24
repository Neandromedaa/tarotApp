import styles from './cardPlaceholder.module.scss';

function CardPlaceholder() {
    return (
        <div className={styles.cardPlaceholder}>
            <div className={styles.cardPlaceholder_title} />
            <div className={styles.cardPlaceholder_card} />
        </div>
    );
}

export default CardPlaceholder;
