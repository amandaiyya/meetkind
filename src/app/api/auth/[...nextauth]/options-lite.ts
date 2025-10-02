import envConfig from "@/lib/envConfig";
import NextAuth from "next-auth";

export const {auth} = NextAuth({
    providers: [],
    callbacks: {
        async session({session, token}) {
            if(token) {
                session.user._id = token._id as string,
                session.user.username = token.username as string,
                session.user.email = token.email as string,
                session.user.isVerified = token.isVerified as boolean,
                session.user.oauthProvider = token.oauthProvider ?? null,
                session.user.oauthProviderId = token.oauthProviderId ?? null,
                session.user.avatar = token.avatar ?? null,
                session.user.address = token.address ?? null,
                session.user.location = token.location ?? null
            }
    
            return session;
        },
    },
    session: {
        strategy: "jwt"
    },
    secret: envConfig.authSecret
})