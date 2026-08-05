export default function scoreToPercentage(score: number): number {
    const clampedScore = Math.min(Math.max(score, 0), 1);
    return Math.round((1 - clampedScore) * 100);
};