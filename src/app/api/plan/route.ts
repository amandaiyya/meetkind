import calculateSearchRadius from "@/helpers/calculateSearchRadius";
import findNearbyVenues from "@/helpers/findNearbyVenues";
import getMatrixRouting from "@/helpers/getMatrixRouting";
import getRankedVenues from "@/helpers/getRankedVenues";
import midpointCalculator from "@/helpers/midpointCalculator";
import ApiError from "@/lib/apiError";
import ApiResponse from "@/lib/apiResponse";
import { PlanningSchema } from "@/schemas/PlanningSchema";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/options-lite";
import Plan from "@/models/Plans.model";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsed = PlanningSchema.safeParse(body);

        if(!parsed.success) {
            const validationError = parsed.error?.issues?.map((error) => error?.message) || [];

            throw new ApiError(
                400,
                validationError?.length > 0
                    ? validationError.join(', ')
                    : "Invalid parameters"
            )
        }

        const {venue, myAddress, friendsAddresses} = parsed.data;

        const friendsCoordinates = friendsAddresses.map((item) => item.coordinates);
        const alllocations = [myAddress.coordinates, ...friendsCoordinates];

        const midpoint = midpointCalculator(alllocations);

        const searchRadius = calculateSearchRadius(alllocations);

        const venues = await findNearbyVenues(midpoint, venue, searchRadius, 20);

        const routedVenues = await getMatrixRouting(alllocations, venues, "car");
        
        const rankedVenues = getRankedVenues(routedVenues);

        const session = await auth();

        if(session?.user) {
            await Plan.create({
                userId: session.user._id,
                participantsLocations: [myAddress, ...friendsAddresses],
                midpoint,
                searchRadius,
                venues: rankedVenues
            });
        }

        return NextResponse.json(
            new ApiResponse(200, rankedVenues, "Plan created successfully"),
            { status: 200 }
        )
    } catch (error) {
        console.log("Planning failed ", error);

        if(error instanceof ApiError) {
            return NextResponse.json(
                new ApiResponse(error.statusCode, null, error.message),
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            new ApiResponse(500, null, "Planning failed"),
            { status: 500 }
        )
    }
}