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
    email?: string,
    password?: string,
    oauthProvider?: string,
    oauthProviderId?: string,
    avatar?: string,
    address?: Address,
    location?: {
        lat: number;
        lng: number;
    },
    isVerified?: boolean;
    verifyCode?: number;
    verifyCodeExpiry?: Date;
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
        unique: true,
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
    },
    verifyCode: {
        type: Number,
    },
    verifyCodeExpiry: {
        type: Date
    }
},{timestamps: true})

const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default User;