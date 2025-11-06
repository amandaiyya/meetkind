import ApiError from "@/lib/apiError";
import dbConnect from "@/lib/dbConnect";
import User, { User as UserInterface } from "@/models/User.model";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import google from "next-auth/providers/google";
import envConfig from "@/lib/envConfig";
 
export const { handlers } = NextAuth({
  providers: [
    credentials({
        id: "credentials",
        name: "credentials",
        credentials: {
            email: {type: "email"},
            password: {type: "password"},
        },
        authorize: async (credentials) => {
            const {email, password} = credentials;

            if(!email || !password) {
                throw new ApiError(400, "Email and Password are required");
            }

            try {
                await dbConnect();

                const user = await User.findOne({
                    email,
                    password: { $ne: null}
                })

                if(!user) {
                    throw new ApiError(404, "User not found");
                }

                if(!user.isVerified) {
                    throw new ApiError(400, "Since your account is not verified, please signup again and verify before login");
                }

                const isPasswordCorrect = await bcrypt.compare(String(password), user.password!);

                if(!isPasswordCorrect) {
                    throw new ApiError(400, "Incorrect Password");
                }

                return {
                    _id: user._id as string,
                    username: user.username,
                    email: user.email,
                    isVerified: user.isVerified,
                    oauthProvider: user.oauthProvider || null,
                    oauthProviderId: user.oauthProviderId || null,
                    avatar: user.avatar || null,
                    address: user.address || null,
                    location: user.location || null,
                }
            } catch (error) {
                if(error instanceof ApiError)
                throw new Error(error.message);

                throw new Error("Internal server error");
            }
        },
    }),
    google
  ],
  callbacks: {
    async jwt({token, user}) {
        if(user) {
            token._id = user._id as string,
            token.username = user.username as string,
            token.email = user.email as string,
            token.isVerified = user.isVerified as boolean,
            token.oauthProvider = user.oauthProvider ?? null,
            token.oauthProviderId = user.oauthProviderId ?? null,
            token.avatar = user.avatar ?? null,
            token.address = user.address ?? null,
            token.location = user.location ?? null
        }

        return token;
    },

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

    async signIn({account, profile, user}) {
        if(account?.provider === "google") {
            await dbConnect();

            let existingUser = await User.findOne({
                email: profile?.email
            })

            if(!existingUser) {
                existingUser = await User.create({
                    username: profile?.name,
                    email: profile?.email,
                    password: null,
                    avatar: profile?.picture,
                    oauthProvider: "google",
                    oauthProviderId: profile?.sub,
                    isVerified: true, 
                    location: null,
                    address: null
                })
            }

            if(!existingUser.oauthProviderId && existingUser.isVerified) {
                existingUser.oauthProvider = "google";
                existingUser.oauthProviderId = profile?.sub as string;
                existingUser.avatar = profile?.picture;

                await existingUser.save();
            }

            if(!existingUser.isVerified) {
                existingUser.username = profile?.name as string;
                existingUser.password = null;
                existingUser.oauthProvider = "google";
                existingUser.oauthProviderId = profile?.sub as string;
                existingUser.avatar = profile?.picture;
                existingUser.isVerified = true;
                existingUser.verifyCode = undefined;
                existingUser.verifyCodeExpiry = undefined;

                await existingUser.save();
            }
            
            user._id = existingUser._id as string;
            user.username = existingUser.username as string;
            user.email = existingUser.email as string;
            user.avatar = existingUser.avatar ?? null;
            user.address = existingUser.address ?? null;
            user.location = existingUser.location ?? null;
            user.isVerified = existingUser.isVerified;
            user.oauthProvider = existingUser.oauthProvider ?? null;
            user.oauthProviderId = existingUser.oauthProviderId ?? null;
        }

        return true;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error"
  },
  session: {
    strategy: "jwt"
  },
  secret: envConfig.authSecret
})

