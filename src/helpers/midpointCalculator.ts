import ApiError from "@/lib/apiError";

export type Coordinate = {
    lat: number;
    lon: number;
}

export function midpointCalculator(
    points: Coordinate[]
): Coordinate {
    if(points.length < 2) {
        throw new ApiError(400, "At least two coordinate is required");
    }

    const sum = points.reduce(
        (acc, p) => {
            acc.lat += p.lat;
            acc.lon += p.lon;
            return acc;
        },
        { lat: 0, lon: 0 }
    )

    return {
        lat: sum.lat / points.length,
        lon: sum.lon / points.length,
    }
}