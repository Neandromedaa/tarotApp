import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, RTKpersistor } from '../store/store';

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={RTKpersistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};