export function formatDateFromDate(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (minutes === 0) {
        return `${hours}h`;
    } else {
        return `${hours}h${minutes.toString().padStart(2, '0')}`;
    }
}
