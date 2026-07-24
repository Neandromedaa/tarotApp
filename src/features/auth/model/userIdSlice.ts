import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserIdState {
    userId: string | null;
}

const initialState: UserIdState = {
    userId: null,
};

const userIdSlice = createSlice({
    name: 'userId',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string | null>) => {
            state.userId = action.payload;
        },
    },
});

export const { setUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
