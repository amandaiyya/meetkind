import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/options-lite";

export default auth((req) => {
    // console.log(req.auth);
    return NextResponse.next();
})

export const config = {
    mathcer: [
        '/:path*'
    ]
}