import { setTarotSpreadType, setTarotSpreadPurpose, setMode } from '../../../features/reading-session/model/readingSlice';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/lib/hooks/useAppSelector';
import type { ReadingMode } from '../../../features/reading-session/model/types';
import type { SpreadOption, SpreadType, SpreadPurpose } from '../../../entities/spread/model/types';

export function useSpreadSelection() {
    const dispatch = useAppDispatch();

    const currentMode = useAppSelector((state) => state.tarot.mode);
    const currentSpreadType = useAppSelector((state) => state.tarot.tarotSpreadType);
    const currentSpreadPurpose = useAppSelector((state) => state.tarot.tarotSpreadPurpose);

    const spreadTypes = useAppSelector((state) => state.spreadTypes.items);
    const spreadTypesStatus = useAppSelector((state) => state.spreadTypes.status);
    const spreadPurposes = useAppSelector((state) => state.spreadPurposes.items);
    const spreadPurposesStatus = useAppSelector((state) => state.spreadPurposes.status);

    const items: SpreadOption[] = currentMode === 0 ? spreadTypes : spreadPurposes;
    const isLoading = currentMode === 0 ? spreadTypesStatus === 'loading' : spreadPurposesStatus === 'loading';

    const selectedItem: SpreadOption | null = currentMode === 0 ? currentSpreadType : currentSpreadPurpose;
    const isNextEnabled = Boolean(selectedItem);

    function selectItem(item: SpreadType | SpreadPurpose): void {
        if (currentMode === 0) {
            dispatch(setTarotSpreadType(item as SpreadType));
        } else {
            dispatch(setTarotSpreadPurpose(item as SpreadPurpose));
        }
    }

    function confirmSelection(): void {
        if (isNextEnabled) dispatch(setMode((currentMode + 1) as ReadingMode));
    }

    return { currentMode, items, selectedItem, isNextEnabled, isLoading, selectItem, confirmSelection };
}
