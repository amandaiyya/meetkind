export default function formatTravelTime(seconds: number): string {
    if (seconds < 60) {
        return `${seconds}s`;
    }

    const minutes = Math.round(seconds / 60);

    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return remainingMinutes === 0
        ? `${hours} hr`
        : `${hours} hr ${remainingMinutes} min`;
};