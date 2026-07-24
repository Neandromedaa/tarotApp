import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppRouter } from './providers/AppRouter';
import { AuthProvider } from './providers/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';
import { StoreProvider } from './providers/StoreProvider';

import './styles/index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
    <StrictMode>
        <AuthProvider>
            <StoreProvider>
                <QueryProvider>
                    <AppRouter />
                </QueryProvider>
            </StoreProvider>
        </AuthProvider>
    </StrictMode>
);
