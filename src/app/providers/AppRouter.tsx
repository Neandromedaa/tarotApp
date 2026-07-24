import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import StartScreen from '../../pages/start/ui/StartScreen';
import MainScreen from '../../pages/main/ui/MainScreen';
import NotFound from '../../pages/not-found/ui/NotFound';
import Reading from '../../pages/reading/ui/Reading';
import DailyCard from '../../pages/daily-card/ui/DailyCard';
import Diary from '../../pages/diary/ui/Diary';

import { ROUTES } from '../../shared/config/routes';

const router = createBrowserRouter([
    {
        path: ROUTES.START,
        element: <StartScreen />,
        errorElement: <NotFound />,
    },
    {
        path: ROUTES.MENU,
        element: <MainScreen />,
    },
    {
        path: ROUTES.READING,
        element: <Reading />,
    },
    {
        path: ROUTES.DAILY_CARD,
        element: <DailyCard />,
    },
    {
        path: ROUTES.DIARY,
        element: <Diary />,
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;