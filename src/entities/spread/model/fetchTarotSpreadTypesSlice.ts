import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../shared/api/firebase';
import type { SpreadType, FetchStatus } from './types';

interface SpreadTypesState {
    items: SpreadType[];
    status: FetchStatus;
}

const initialState: SpreadTypesState = {
    items: [],
    status: 'idle',
};

export const fetchSpreadTypes = createAsyncThunk('spreadTypes/fetch', async (): Promise<SpreadType[]> => {
    const snapshot = await getDocs(collection(db, 'spreadTypes'));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as SpreadType);
});

const spreadTypesSlice = createSlice({
    name: 'spreadTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpreadTypes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSpreadTypes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchSpreadTypes.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default spreadTypesSlice.reducer;
