import clsx from 'clsx';
import { PulseLoader } from 'react-spinners';

import { useSpreadSelection } from '../model/useSpreadSelection';
import SpreadOptionCard from './SpreadOptionCard';

import styles from './spreadOptionsGrid.module.scss';

const SKELETON_COUNT = 4;

function SpreadOptionsGrid() {
    const { items, selectedItem, isNextEnabled, isLoading, selectItem, confirmSelection } = useSpreadSelection();

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                {isLoading
                    ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                          <div key={index} className={styles.skeletonCard}>
                              <PulseLoader color="#8b5cf6" size={10} />
                          </div>
                      ))
                    : items.map((item) => (
                          <SpreadOptionCard
                              key={item.id}
                              item={item}
                              isSelected={selectedItem?.id === item.id}
                              onClick={selectItem}
                          />
                      ))}
            </div>
            <button
                className={clsx(styles.nextButton, !isNextEnabled && styles.nextButton_disabled)}
                onClick={confirmSelection}
                disabled={!isNextEnabled}>
                Далее
            </button>
        </div>
    );
}

export default SpreadOptionsGrid;
