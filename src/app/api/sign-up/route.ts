import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import ApiError from "@/lib/apiError";
import ApiResponse from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const {username, email, password} = await req.json();

        if(!username || !email || !password){
            throw new ApiError(400, "Username, Email and Password is required");
        }

        const existingUser = await User.findOne({email});

        const verifyCode = Math.floor(100000 + Math.random() * 900000);

        if(existingUser){
            if(existingUser.isVerified){
                return NextResponse.json(
                    new ApiResponse(400, null, "User already exists with this email"),
                    { status: 400 }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);

                existingUser.password = hashedPassword;
                existingUser.verifyCode = verifyCode;
                existingUser.verifyCodeExpiry = new Date(Date.now() + 3600000);

                await existingUser.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const verifyCodeExpiry = new Date(Date.now() + 3600000);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                isVerified: false,
                verifyCode,
                verifyCodeExpiry
            });

            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode.toString()
        )

        if(!emailResponse.success){
            return NextResponse.json(
                new ApiResponse(500, null, emailResponse.message),
                { status: 500 }
            );
        }

        return NextResponse.json(
            new ApiResponse(201, null, "User registered successfully. Please verify your email"),
            { status: 201 }
        )
    } catch (error) {
        console.log("Signup failed ", error);

        if(error instanceof ApiError) {
            return NextResponse.json(
                new ApiResponse(error.statusCode, null, error.message),
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            new ApiResponse(500, null, "Signup failed"),
            { status: 500 }
        )
    }
}