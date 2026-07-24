export function getTimeGreeting(hours: number = new Date().getHours()): string {
    if (hours >= 4 && hours < 12) return 'Доброе утро';
    if (hours >= 12 && hours < 16) return 'Добрый день';
    if (hours >= 16 && hours < 23) return 'Добрый вечер';
    return 'Ночь, лучшее время для гадания';
}
