import ApiError from "@/lib/apiError";
import ApiResponse from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import { VerifySchema } from "@/schemas/verirySchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await dbConnect();

        const body = await req.json();

        const parsed = VerifySchema.safeParse(body);

        if(!parsed.success) {
            const validationError = parsed.error?.issues?.map((error) => error?.message) || [];

            throw new ApiError(
                400,
                validationError?.length > 0 
                    ? validationError.join(', ')
                    : "Invalid parameters"
            )
        }

        const {email, verifyCode} = parsed.data;

        const user = await User.findOne({email});

        if(!user) {
            throw new ApiError(404, "User not found");
        }

        if(!user.verifyCodeExpiry) {
            throw new ApiError(400, "Already verified");
        }

        const isVerifyCodeValid = user.verifyCode === verifyCode.join("");
        const isVerifyCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isVerifyCodeValid && isVerifyCodeNotExpired) {
            user.isVerified = true;
            user.verifyCode = undefined;
            user.verifyCodeExpiry = undefined;

            await user.save();

            return NextResponse.json(
                new ApiResponse(200, null, "User verified successfully"),
                { status: 200 }
            )
        } else if(!isVerifyCodeNotExpired) {
            return NextResponse.json(
                new ApiResponse(400, null, "Verification code has expired, please signup again"),
                { status: 400 }
            )
        } else {
            return NextResponse.json(
                new ApiResponse(400, null, "Incorrect verification code"),
                { status: 400 }
            )
        }
    } catch (error) {
        console.log("User Verification failed ",error);

        if(error instanceof ApiError) {
            return NextResponse.json(
                new ApiResponse(error.statusCode, null, error.message),
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            new ApiResponse(500, null, "User Verification failed"),
            { status: 500 }
        )
    }
}