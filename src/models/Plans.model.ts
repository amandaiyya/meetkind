import mongoose, { Schema, Document } from "mongoose";
import { Coordinate } from "@/helpers/midpointCalculator";
import "./User.model";

// import { AccessibilityNeedsSchema } from "@/schemas/AccessibilityNeedsSchema";
// import * as z from 'zod';

// type AccessibilityNeedsSchema = z.infer<typeof AccessibilityNeedsSchema>

export interface Venue extends Document {
    placeId: string;
    name: string;
    address: string;
    coordinates: Coordinate;
    category: string;
    routes: {
        userIndex: number;
        travelDistance: number; // meters
        travelTime: number; // seconds
    }[];
    totalTravelDistance: number;
    totalTravelTime: number;
    averageTravelDistance: number;
    averageTravelTime: number;
    travelTimeStdDev: number;
    normalizedTotalTravelTime: number;
    normalizedTravelTimeStdDev: number;
    score: number;

    // accessibilities?: AccessibilityNeedsSchema;
    // ratings?: number;
    // reviews?: string[];
    // photos?: string[];
}

export interface Plan extends Document{
    userId: mongoose.Types.ObjectId;
    participantsLocations: {
        address: string;
        coordinates: Coordinate;
    }[];
    midpoint: Coordinate;
    searchRadius: number;
    venues: Venue[];

    // accessibilityNeeds?: AccessibilityNeedsSchema;
}

const VenueSchema = new Schema<Venue>({
    name: {
        type: String,
        required: [true, "Venue name is required"],
        trim: true
    },
    placeId: {
        type: String,
        unique: true,
        required: [true, "Place id is required"],
    },
    address: {
        type: String,
        required: [true, "Venue address is required"],
    },
    coordinates: {
        lat: { type: Number, required: [true, "Venue coordinates lat is required"], },
        lon: { type: Number, required: [true, "Venue coordinates lon is required"], }
    },
    category: {
        type: String,
        required: [true, "Venue category is required"],
    },
    routes: [{
        userIndex: {
            type: Number,
            required: true,
        },
        travelDistance: {
            type: Number,
            required: true,
        },
        travelTime: {
            type: Number,
            required: true,
        }
    }],
    totalTravelDistance: {
        type: Number,
        required: [true, "Total travel distance is required"],
    },
    totalTravelTime: {
        type: Number,
        required: [true, "Total travel time is required"],
    },
    averageTravelDistance: {
        type: Number,
        required: [true, "Average travel distance is required"],
    },
    averageTravelTime: {
        type: Number,
        required: [true, "Average travel time is required"],
    },
    travelTimeStdDev: {
        type: Number,
        required: [true, "Trave time std dev is required"],
    },
    normalizedTotalTravelTime: {
        type: Number,
        required: true,
    },
    normalizedTravelTimeStdDev: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: [true, "Venue score is required"],
    },

    // accessibilities: {
    //     wheelchair: { tyep: Boolean },
    //     restroom: { tyep: Boolean },
    //     elevator: { tyep: Boolean },
    //     quietPlace: { tyep: Boolean }
    // },
    // ratings: {
    //     type: Number,
    // },
    // reviews: [String],
    // photos: [String],
}, { timestamps: true })

const PlanSchema = new Schema<Plan>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    participantsLocations: [{
        address: {
            type: String,
            required: [true, "Participants address is required"],
        },
        coordinates: {
            lat: { type: Number, required: [true, "Participants coordinates lat is required"], },
            lon: { type: Number, required: [true, "Participants coordinates lon is required"], }
        }
    }],
    midpoint: {
        lat: { type: Number, required: [true, "Midpoint lat is required"], },
        lon: { type: Number, required: [true, "Midpoint lon is required"], },
    },
    searchRadius: {
        type: Number,
        required: [true, "Search Radius is required"],
    },
    venues: [VenueSchema],

    // accessibilityNeeds: {
    //     wheelchair: { tyep: Boolean },
    //     restroom: { tyep: Boolean },
    //     elevator: { tyep: Boolean },
    //     quietPlace: { tyep: Boolean }
    // },
},{ timestamps: true })

const Plan = (mongoose.models.Plan as mongoose.Model<Plan>) || mongoose.model<Plan>("Plan", PlanSchema)

export default Plan;