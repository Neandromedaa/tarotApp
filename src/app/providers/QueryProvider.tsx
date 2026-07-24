import type { ReactNode } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});

const persister = createAsyncStoragePersister({
    storage: window.localStorage,
});

interface QueryProviderProps {
    children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            {children}
        </PersistQueryClientProvider>
    );
};
