import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "@/models/User.model";
import { Address } from "@/models/User.model";

declare module "next-auth" {
    interface User {
        _id: string;
        username: string,
        email?: string,
        isVerified: boolean;
        oauthProvider?: string | null;
        oauthProviderId?: string | null;
        avatar?: string | null;
        address?: Address | null;
        location?: {
            lat: number;
            lng: number;
        } | null;
    }

    interface Session {
        user: {
            _id: string;
            username: string,
            email?: string,
            isVerified: boolean;
            oauthProvider?: string | null;
            oauthProviderId?: string | null;
            avatar?: string | null;
            address?: Address | null;
            location?: {
                lat: number;
                lng: number;
            } | null;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id: string;
        username: string,
        email?: string,
        isVerified: boolean;
        oauthProvider?: string | null;
        oauthProviderId?: string | null;
        avatar?: string | null;
        address?: Address | null;
        location?: {
            lat: number;
            lng: number;
        } | null;
    }
}