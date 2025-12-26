import mongoose, { Schema, Document } from "mongoose";
import { AccessibilityNeedsSchema } from "@/schemas/AccessibilityNeedsSchema";
import * as z from 'zod';
import { Address } from "./User.model";

type AccessibilityNeedsSchema = z.infer<typeof AccessibilityNeedsSchema>

export interface Plan extends Document{
    title: String;
    planCreator: mongoose.Types.ObjectId;
    midpoint: {
        lat: number;
        lng: number;
    };
    participantLocations: {
        address?: Address;
        lat: number;
        lng: number;
    }[];
    accessibilityNeeds?: AccessibilityNeedsSchema;
    venues: mongoose.Types.ObjectId[];
}

const PlanSchema: Schema<Plan> = new Schema({
    title: {
        type: String,
        required: [true, "Title of plan is required"],
        trim: true,
    },
    planCreator: {
        required: [true, "Plan Creator id is required"],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    midpoint: {
        lat: { type: Number },
        lng: { type: Number },
    },
    participantLocations: {
        address: {
            formatted: { type: String },
            houseNumber: { type: String },
            area: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String }, 
        },
        lat: { type: Number },
        lng: { type: Number }
    },
    accessibilityNeeds: {
        wheelchair: { tyep: Boolean },
        restroom: { tyep: Boolean },
        elevator: { tyep: Boolean },
        quietPlace: { tyep: Boolean }
    },
    venues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Venue',
        }
    ]
},{ timestamps: true })

const Plan = (mongoose.models.Plan as mongoose.Model<Plan>) || mongoose.model<Plan>("Plan", PlanSchema)

export default Plan;