import mongoose, { Schema, Document } from "mongoose";

export type Address = {
    formatted: string,
    houseNumber: string,
    area: string
    city: string,
    state: string,
    country: string,
}

export interface User extends Document {
    username: string,
    email: string,
    password?: string | null,
    oauthProvider?: string | null,
    oauthProviderId?: string | null,
    avatar?: string | null,
    address?: Address | null,
    location?: {
        lat: number;
        lng: number;
    },
    isVerified: boolean;
    verifyCode?: string | undefined;
    verifyCodeExpiry?: Date | undefined;
    token?: string | undefined;
    tokenExpiry?: Date | undefined;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
    },
    oauthProvider: {
        type: String,
    },
    oauthProviderId: {
        type: String,
    },
    avatar: {
        type: String,
    },
    address: {
        formatted: { type: String },
        houseNumber: { type: String },
        area: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
    },
    location: {
        lat: {type: Number},
        lng: {type: Number},
    },
    isVerified: {
        type: Boolean,
        required: [true, "isVerified is required"],
        default: false,
    },
    verifyCode: {
        type: String,
    },
    verifyCodeExpiry: {
        type: Date,
    },
    token: {
        type: String,
    },
    tokenExpiry: {
        type: Date,
    }
},{timestamps: true})

UserSchema.index(
    { oauthProviderId: 1 },
    { unique: true, partialFilterExpression: { oauthProviderId: { $type: "string" } } }
  );

const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default User;