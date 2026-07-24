import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../shared/api/firebase';
import type { TarotCard } from './types';
import type { FetchStatus } from '../../../shared/lib/model/types';

interface CardsState {
    items: TarotCard[];
    status: FetchStatus;
}

const initialState: CardsState = {
    items: [],
    status: 'idle',
};

export const fetchCards = createAsyncThunk('cards/fetch', async (): Promise<TarotCard[]> => {
    const snapshot = await getDocs(collection(db, 'cards'));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TarotCard);
});

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCards.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cardsSlice.reducer;
