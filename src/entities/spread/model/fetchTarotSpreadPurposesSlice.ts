import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../shared/api/firebase';
import type { SpreadPurpose, FetchStatus } from './types';

interface SpreadPurposesState {
    items: SpreadPurpose[];
    status: FetchStatus;
}

const initialState: SpreadPurposesState = {
    items: [],
    status: 'idle',
};

export const fetchSpreadPurposes = createAsyncThunk('spreadPurposes/fetch', async (): Promise<SpreadPurpose[]> => {
    const snapshot = await getDocs(collection(db, 'spreadPurpose'));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as SpreadPurpose);
});

const spreadPurposesSlice = createSlice({
    name: 'spreadPurposes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpreadPurposes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSpreadPurposes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchSpreadPurposes.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default spreadPurposesSlice.reducer;
