import { Coordinate } from "./midpointCalculator";
import { venueFields } from "./findNearbyVenues";
import axios from "axios";

type VenueRoute = {
    userIndex: number;
    travelDistance: number; // meters
    travelTime: number; // seconds
};

export type VenueWithRoutes = venueFields & {
    routes: VenueRoute[];

    totalTravelDistance: number;
    totalTravelTime: number;

    averageTravelDistance: number;
    averageTravelTime: number;

    travelTimeStdDev: number;
};

type TravelMode = "car" | "pedestrian" ;

export default async function getMatrixRouting(
    users: Coordinate[],
    venues: venueFields[],
    travelMode: TravelMode = "car"
): Promise<VenueWithRoutes[]> {
    const { data } = await axios.post(
        `https://api.tomtom.com/routing/matrix/2?key=${process.env.TOMTOM_API_KEY}`,
        {
            origins: users.map((user) => ({
                point: {
                    latitude: user.lat,
                    longitude: user.lon,
                },
            })),

            destinations: venues.map((venue) => ({
                point: {
                    latitude: venue.coordinates.lat,
                    longitude: venue.coordinates.lon,
                },
            })),

            options: {
                departAt: "now",
                routeType: "fastest",
                traffic: "historical",
                travelMode,
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 10000,
        }
    );

    const venuesWithRoutes: VenueWithRoutes[] = venues.map((venue) => ({
        ...venue,

        routes: [],

        totalTravelDistance: 0,
        totalTravelTime: 0,

        averageTravelDistance: 0,
        averageTravelTime: 0,

        travelTimeStdDev: 0
    }));

    for (const cell of data.data) {
        // Skip failed routes
        if (!cell.routeSummary) continue;

        const venue = venuesWithRoutes[cell.destinationIndex];

        venue.routes.push({
            userIndex: cell.originIndex,
            travelDistance: cell.routeSummary.lengthInMeters,
            travelTime: cell.routeSummary.travelTimeInSeconds,
        });
    }

    for (const venue of venuesWithRoutes) {

        if (venue.routes.length === 0) continue;

        const distances = venue.routes.map(r => r.travelDistance);

        const times = venue.routes.map(r => r.travelTime);

        const mean = times.reduce((sum, time) => sum + time, 0) / times.length;

        const variance =
            times.reduce((sum, time) => {
                return sum + (time - mean) ** 2;
            }, 0) / times.length;

        venue.totalTravelTime =
            times.reduce((sum, t) => sum + t, 0);

        venue.totalTravelDistance =
            distances.reduce((sum, d) => sum + d, 0);

        venue.averageTravelTime =
            venue.totalTravelTime / venue.routes.length;

        venue.averageTravelDistance =
            venue.totalTravelDistance / venue.routes.length;

        venue.travelTimeStdDev = Math.sqrt(variance);
    }

    // Remove venues where routing failed for every user
    return venuesWithRoutes.filter(
        venue => venue.routes.length === users.length
    );
}