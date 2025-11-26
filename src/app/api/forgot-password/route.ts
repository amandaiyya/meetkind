import { sendPasswordResetEmail } from "@/helpers/sendPasswordResetEmail";
import ApiError from "@/lib/apiError";
import ApiResponse from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { ForgotPasswordSchema } from "@/schemas/ForgotPasswordSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();

        const parsed = ForgotPasswordSchema.safeParse(body);

        if(!parsed.success) {
            const validationError = parsed.error?.issues?.map((error) => error?.message) || [];

            throw new ApiError(
                400,
                validationError?.length > 0
                    ? validationError.join(', ')
                    : "Invalid parameters"
            )
        }

        const {email} = parsed.data;

        await dbConnect();

        const user = await User.findOne({email});

        if(!user) {
            throw new ApiError(404, "User not found");
        }

        if(!user.isVerified) {
            throw new ApiError(400, "Please Sign up again")
        }

        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(token, 10);
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

        user.token = hashedToken;
        user.tokenExpiry = tokenExpiry;

        await user.save();

        const emailResponse = await sendPasswordResetEmail(
            email,
            String(user._id),
            user.username,
            token
        )

        if(!emailResponse.success){
            return NextResponse.json(
                new ApiResponse(500, null, emailResponse.message),
                { status: 500 }
            );
        }

        return NextResponse.json(
            new ApiResponse(201, null, "Reset Link sent successfully."),
            { status: 201 }
        )
    } catch (error) {
        console.log("Password forgot process failed ", error);
        
        if(error instanceof ApiError) {
            return NextResponse.json(
                new ApiResponse(error.statusCode, null, error.message),
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            new ApiResponse(500, null, "Password forgot process failed"),
            { status: 500 }
        )
    }
}