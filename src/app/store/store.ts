import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tarotReducer from '../../features/reading-session/model/readingSlice';
import spreadTypesReducer from '../../entities/spread/model/fetchTarotSpreadTypesSlice';
import spreadPurposesReducer from '../../entities/spread/model/fetchTarotSpreadPurposesSlice';
import cardsReducer from '../../entities/card/model/fetchTarotCardsSlice';
import userIdReducer from '../../features/auth/model/userIdSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userId'],
};

const rootReducer = combineReducers({
    spreadTypes: spreadTypesReducer,
    spreadPurposes: spreadPurposesReducer,
    cards: cardsReducer,
    tarot: tarotReducer,
    userId: userIdReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/FLUSH', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
            },
        }),
});

export const RTKpersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
