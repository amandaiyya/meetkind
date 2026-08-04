export type venueFields = {
    placeId: string;
    name: string;
    address: string;
    coordinates: {
        lat: number;
        lon: number;
    },
    dist: number;
    category: string;
};

export type VenueRoute = {
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

export type RankedVenue = VenueWithRoutes & {
    normalizedTotalTravelTime: number;
    normalizedTravelTimeStdDev: number;
    score: number;
};