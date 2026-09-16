import ApiError from "@/lib/apiError";
import ApiResponse from "@/lib/apiResponse";
import { getPlans } from "@/lib/getPlans";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;

        const data = await getPlans(page);

        return NextResponse.json(
            new ApiResponse(200, data, "Plans history fetched successfully"),
            { status: 200 }
        )
    } catch (error) {
        console.log("Failed fetching plans history", error);

        if(error instanceof ApiError) {
            return NextResponse.json(
                new ApiResponse(error.statusCode, null, error.message),
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            new ApiResponse(500, null, "Failed fetching plans history"),
            { status: 500 }
        )
    }
}