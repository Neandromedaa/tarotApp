import { PulseLoader } from 'react-spinners';

import ActionsMenu from '../../../widgets/actions-menu/ui/ActionsMenu';
import { useAuth } from '../../../features/auth/model/useAuth';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';

import styles from './mainScreen.module.scss';

function MainScreen() {
    const userId = useAppSelector((state) => state.userId.userId);
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className={styles.mainScreen}>
                <PulseLoader color="#8b5cf6" size={10} />
            </div>
        );
    }

    return (
        <div className={styles.mainScreen}>
            <ActionsMenu isGuest={!userId} />
        </div>
    );
}

export default MainScreen;
