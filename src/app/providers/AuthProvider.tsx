import type { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENTID}
            authorizationParams={{ redirect_uri: window.location.origin }}>
            {children}
        </Auth0Provider>
    );
};
