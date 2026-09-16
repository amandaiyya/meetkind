import ApiError from "@/lib/apiError";
import ApiResponse from "@/lib/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/options-lite";
import { ProfileSchema } from "@/schemas/ProfileSchema";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

export async function PUT(req: NextRequest) {
    try {
        const session = await auth();

        if(!session?.user) {
            return NextResponse.json(
                new ApiResponse(401, null, "Unathorized"),
                { status: 401 }
            )
        }

        const id = session.user._id;

        const body = await req.json();

        const parsed = ProfileSchema.safeParse(body);

        if(!parsed.success) {
            const validationError = parsed.error?.issues?.map((error) => error?.message) || [];

            throw new ApiError(
                400,
                validationError?.length > 0 
                    ? validationError.join(', ')
                    : "Invalid parameters"
            )
        }

        const { username, email } = parsed.data;

        await dbConnect();

        const user = await User.findByIdAndUpdate(
            id,
            {
                username,
                email
            },
            { returnDocument: "after", runValidators: true }
        ).select("username email");

        if(!user) {
            throw new ApiError(404, "User not found");
        }

        return NextResponse.json(
            new ApiResponse(200, user, "Profile updated successfully"),
            { status: 200 }
        )
    } catch (error) {
        console.log("Profile update failed", error);

        if(error instanceof ApiError) {
            return NextResponse.json(
                new ApiResponse(error.statusCode, null, error.message),
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            new ApiResponse(500, null, "Profile update failed"),
            { status: 500 }
        )
    }
}