export default function formatTravelDistance(meters: number): string {
    if (meters < 1000) {
        return `${meters} m`;
    }

    return `${parseFloat((meters / 1000).toFixed(1))} km`;
};