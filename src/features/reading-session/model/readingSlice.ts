import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SpreadType, SpreadPurpose } from '../../../entities/spread/model/types';
import type { TarotCard } from '../../../entities/card/model/types';
import type { ReadingSessionState, ReadingMode } from './types';

const initialState: ReadingSessionState = {
    tarotSpreadType: null,
    tarotSpreadPurpose: null,
    cardsArray: [],
    mode: 0,
};

const readingSlice = createSlice({
    name: 'reading',
    initialState,
    reducers: {
        setTarotSpreadType: (state, action: PayloadAction<SpreadType>) => {
            state.tarotSpreadType = action.payload;
        },
        setTarotSpreadPurpose: (state, action: PayloadAction<SpreadPurpose>) => {
            state.tarotSpreadPurpose = action.payload;
        },
        setCardsArray: (state, action: PayloadAction<TarotCard[]>) => {
            state.cardsArray = action.payload;
        },
        setMode: (state, action: PayloadAction<ReadingMode>) => {
            if (state.mode === 3) state.mode = 0;
            else state.mode = action.payload;
        },
        resetSavedReadings: () => initialState,
    },
});

export const { setTarotSpreadType, setTarotSpreadPurpose, setCardsArray, setMode, resetSavedReadings } = readingSlice.actions;

export default readingSlice.reducer;
