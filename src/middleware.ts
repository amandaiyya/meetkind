import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/options-lite";

export default auth((req) => {
    const url = req.nextUrl;

    if(req.auth && (
        url.pathname === '/sign-up' ||
        url.pathname === '/sign-in' ||
        url.pathname === '/verify-user' ||
        url.pathname === '/forgot-password' ||
        url.pathname === '/reset-password'
    )) {
        return NextResponse.redirect(new URL('/', url.origin));
    }

    return NextResponse.next();
})

export const config = {
    mathcer: [
        '/sign-up',
        '/sign-in',
        '/verify-user',
        '/forgot-password',
        '/reset-password'
    ]
}