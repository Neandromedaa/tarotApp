import type { DayTime } from '../../../features/generate-tarot-meaning/model/types';

export function getDayTime(hours: number = new Date().getHours()): DayTime {
    if (hours >= 4 && hours < 12) return 'morning';
    if (hours >= 12 && hours < 18) return 'afternoon';
    return 'evening';
}
