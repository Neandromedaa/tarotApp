import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setUserId } from './userIdSlice';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';

export function useAuth() {
    const dispatch = useAppDispatch();
    const { loginWithRedirect, logout: auth0Logout, user, isAuthenticated, isLoading, error } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(setUserId(user.sub ?? null));
        }
    }, [isAuthenticated, user, dispatch]);

    function continueAsGuest(): void {
        dispatch(setUserId(null));
    }

    function signup(): void {
        loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
    }

    function login(): void {
        loginWithRedirect();
    }

    function logout(): void {
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    }

    return { isLoading, error, isAuthenticated, login, signup, continueAsGuest, logout };
}
