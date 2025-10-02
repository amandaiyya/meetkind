import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/options-lite";

export default auth((req: NextRequest) => {
    console.log(auth);
    return NextResponse.next();
})

export const config = {
    mathcer: [

    ]
}