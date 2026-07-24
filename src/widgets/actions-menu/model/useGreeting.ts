import { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getTimeGreeting } from '../lib/getTimeGreeting';

const DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

interface GreetingInfo {
    dayOfWeek: string;
    date: number;
    month: string;
    userName: string;
    greeting: string;
}

export function useGreeting(): GreetingInfo {
    const { user } = useAuth0();

    return useMemo(() => {
        const today = new Date();
        return {
            dayOfWeek: DAYS[today.getDay()],
            date: today.getDate(),
            month: MONTHS[today.getMonth()],
            userName: user?.given_name || 'Гость',
            greeting: getTimeGreeting(today.getHours()),
        };
    }, [user]);
}
