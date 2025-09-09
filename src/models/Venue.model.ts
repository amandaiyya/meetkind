import mongoose, { Schema, Document } from "mongoose";
import { AccessibilityNeedsSchema } from "@/schemas/AccessibilityNeedsSchema";
import * as z from 'zod';

type AccessibilityNeedsSchema = z.infer<typeof AccessibilityNeedsSchema>

export interface Venue extends Document{
    name: string,
    placeId: string,
    category: string,
    address?: string;
    location: {
        lat: number;
        lng: number;
    };
    accessibilities?: AccessibilityNeedsSchema;
    ratings?: number;
    reviews?: string[];
    photos?: string[];
}

const VenueSchema: Schema<Venue> = new Schema({
    name: {
        type: String,
        required: [true, "Vanue name is required"],
        trim: true
    },
    placeId: {
        type: String,
        unique: true,
        required: [true, "Place id is required"],
    },
    category: {
        type: String,
    },
    address: {
        type: String,
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    accessibilities: {
        wheelchair: { tyep: Boolean },
        restroom: { tyep: Boolean },
        elevator: { tyep: Boolean },
        quietPlace: { tyep: Boolean }
    },
    ratings: {
        type: Number,
    },
    reviews: [String],
    photos: [String],
}, { timestamps: true })

const Venue = (mongoose.models.Venue as mongoose.Model<Venue>) || mongoose.model<Venue>("Venue", VenueSchema)

export default Venue;