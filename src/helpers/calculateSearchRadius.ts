import distanceInKm from "./distanceInKm";
import { Coordinate } from "./midpointCalculator";

export default function calculateSearchRadius(
    locations: Coordinate[]
): number {
    if(locations.length < 2) {
        return 1000;
    }

    let maxDistance = 0;

    for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            maxDistance = Math.max(
                maxDistance,
                distanceInKm(locations[i], locations[j])
            );
        }
    }

    const proportionalRadius = maxDistance * 0.15 * 1000;

    return Math.trunc(Math.min(
        Math.max(proportionalRadius, 1000),
        8000
    ))
}