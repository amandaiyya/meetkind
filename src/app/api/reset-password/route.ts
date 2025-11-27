import ApiError from "@/lib/apiError";
import ApiResponse from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import bcrypt from "bcrypt";
import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){
    try {
        const body = await req.json();

        const parsed = ResetPasswordSchema.safeParse(body);

        if(!parsed.success) {
            const validationError = parsed.error?.issues?.map((error) => error?.message) || [];

            throw new ApiError(
                400,
                validationError?.length > 0 
                    ? validationError.join(', ')
                    : "Invalid parameters"
            )
        }

        const {id, token, password} = parsed.data;

        await dbConnect();

        const user = await User.findById(id);

        if(!user) {
            throw new ApiError(404, "User not found");
        }

        const isTokenValid = await bcrypt.compare(token, user.token!);
        const isTokenNotExpired = new Date(user.tokenExpiry!) > new Date();
        const isPasswordsSame = await bcrypt.compare(password, user.password!);

        if(!isTokenValid) {
            throw new ApiError(400, "Reset token doesn't matched");
        }

        if(!isTokenNotExpired) {
            throw new ApiError(400, "Reset token has been expired");
        }

        if(!isPasswordsSame) {
            const newPassword = await bcrypt.hash(password, 10);

            user.password = newPassword;
            user.token = undefined;
            user.tokenExpiry = undefined;
            await user.save();

            return NextResponse.json(
                new ApiResponse(200, null, "Password updated successfully"),
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                new ApiResponse(400, null, "New password must not be same as old"),
                { status: 400 }
            )
        }
    } catch (error) {
        console.log("Password reset failed ", error);

        if(error instanceof ApiError) {
            return NextResponse.json(
                new ApiResponse(error.statusCode, null, error.message),
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            new ApiResponse(500, null, "Password reset failed"),
            { status: 500 }
        )
    }
}