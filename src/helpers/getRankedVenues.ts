import { VenueWithRoutes } from "./getMatrixRouting";

type RankedVenue = VenueWithRoutes & {
    normalizedTotalTravelTime: number;
    normalizedTravelTimeStdDev: number;
    score: number;
};

const TIME_WEIGHT = 0.7;
const FAIRNESS_WEIGHT = 0.3;

export default function getRankedVenues(
    venues: VenueWithRoutes[]
): RankedVenue[] {
    if (venues.length <= 1) {
        return venues.map(v => ({
            ...v,
            normalizedTotalTravelTime: 0,
            normalizedTravelTimeStdDev: 0,
            score: 0,
        }));
    }

    const totalTimes = venues.map(v => v.totalTravelTime);
    const stdDevs = venues.map(v => v.travelTimeStdDev);

    const minTime = Math.min(...totalTimes);
    const maxTime = Math.max(...totalTimes);

    const minStd = Math.min(...stdDevs);
    const maxStd = Math.max(...stdDevs);

    return venues
        .map((venue) => {
            const normalizedTotalTravelTime =
                maxTime === minTime
                    ? 0
                    : (venue.totalTravelTime - minTime) /
                      (maxTime - minTime);

            const normalizedTravelTimeStdDev =
                maxStd === minStd
                    ? 0
                    : (venue.travelTimeStdDev - minStd) /
                      (maxStd - minStd);

            const score =
                TIME_WEIGHT * normalizedTotalTravelTime +
                FAIRNESS_WEIGHT * normalizedTravelTimeStdDev;

            return {
                ...venue,

                normalizedTotalTravelTime,
                normalizedTravelTimeStdDev,

                score,
            };
        })
        .sort((a, b) => a.score - b.score);
};