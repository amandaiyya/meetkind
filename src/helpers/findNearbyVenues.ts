import axios from "axios";
import { Coordinate } from "./midpointCalculator";
import ApiError from "@/lib/apiError";
import envConfig from "@/lib/envConfig";
import { venueFields } from "@/types/venue";

export default async function findNearbyVenues(
    midpoint: Coordinate,
    venueCategory: string,
    radius: number,
    limit: number,
):      
    Promise<venueFields[]>
{
    const { data } = await axios.get(
            `https://api.tomtom.com/search/2/categorySearch/${venueCategory}.json?`
        ,{
        params: {
            lat: midpoint.lat,
            lon: midpoint.lon,
            limit: limit,
            radius,
            categorySet: venueCategory === "restaurant" ? 7315 : 9376,
            relatedPois: "off",
            key: envConfig.tomtomApiKey,
        },
        timeout: 8000,
    })

    if(!Array.isArray(data?.results)) {
        throw new ApiError(400, "Invalid API response");
    }

    const venues: venueFields[] = data?.results.map((venue: any) => {
        return {
            placeId: venue.id,
            name: venue.poi.name,
            address: venue.address.freeformAddress,
            coordinates: venue.position,
            dist: venue.dist,
            category: 
                parseInt(venue.poi.categorySet[0].id.toString().slice(0, 4)) === 7315 
                ? "restaurant" : "cafe",
        }
    })

    const seen = new Set<string>();

    return venues
        .filter((v) => {
            const key = v.placeId;

            if (seen.has(key)) return false;
            seen.add(key);

            return (
                v.dist <= radius &&
                v.category.includes(venueCategory)
            );
        })
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 10);
}